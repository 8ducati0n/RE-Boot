# RE:Boot — GCP Cloud Run 배포 가이드

> 이 문서는 RE:Boot (`api` + `web`)를 Google Cloud Run 에 배포하는 전 과정을 단계별로 설명한다.
> 본 배포는 **학회 데모 스케일**(동시 접속 수십 명 수준)을 가정한다.

---

## 0. 사전 준비 (Prerequisites)

| 항목 | 설명 |
|---|---|
| gcloud CLI | `brew install --cask google-cloud-sdk` 또는 [공식 설치 가이드](https://cloud.google.com/sdk/docs/install) |
| GCP 프로젝트 | 결제(billing) 계정에 연결된 프로젝트 1개 |
| IAM 권한 | 본인 계정이 최소 `Owner` 또는 (`Cloud Build Editor` + `Run Admin` + `Secret Manager Admin` + `Cloud SQL Admin`) |
| Docker | 로컬 테스트용(선택) |

```bash
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com
```

---

## 1. Cloud SQL (PostgreSQL + pgvector) 인스턴스 생성

```bash
REGION=asia-northeast3
INSTANCE=reboot-pg

gcloud sql instances create ${INSTANCE} \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=${REGION} \
  --storage-size=10GB \
  --storage-type=SSD \
  --backup

# DB / 사용자 생성
gcloud sql databases create reboot --instance=${INSTANCE}
gcloud sql users create reboot --instance=${INSTANCE} --password=<STRONG_PW>

# pgvector 확장 설치 (psql로 접속 후)
gcloud sql connect ${INSTANCE} --user=postgres --database=reboot
# postgres=# CREATE EXTENSION IF NOT EXISTS vector;
```

> **참고**: 데모 규모 기준 `db-f1-micro` (shared vCPU, 0.6GB RAM) 로 충분하다. 프로덕션이라면 `db-g1-small` 이상을 권장한다.

커넥션 이름(`<PROJECT>:<REGION>:<INSTANCE>`)을 기록해 두자. 이후 `_DB_INSTANCE` substitution으로 사용된다.

---

## 2. Artifact Registry 레포지토리 생성

```bash
gcloud artifacts repositories create reboot \
  --repository-format=docker \
  --location=${REGION} \
  --description="RE:Boot container images"
```

---

## 3. Secret Manager 시크릿 등록

```bash
# OpenAI API 키
printf '%s' 'sk-...' | gcloud secrets create OPENAI_API_KEY --data-file=-

# JWT 비밀키
openssl rand -base64 48 | gcloud secrets create JWT_SECRET --data-file=-

# DB 접속 URL (Cloud SQL 커넥션 소켓 경로를 사용)
printf '%s' \
  'postgresql+asyncpg://reboot:<STRONG_PW>@/reboot?host=/cloudsql/<PROJECT>:<REGION>:reboot-pg' \
  | gcloud secrets create DATABASE_URL --data-file=-
```

Cloud Run 런타임 서비스 계정(`<PROJECT>@appspot.gserviceaccount.com` 또는 전용 SA)에 각 시크릿에 대한 `Secret Manager Secret Accessor` 권한을 부여한다.

```bash
for S in OPENAI_API_KEY JWT_SECRET DATABASE_URL; do
  gcloud secrets add-iam-policy-binding $S \
    --member="serviceAccount:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
done
```

---

## 4. 초기 배포 (Cloud Build)

저장소 루트에서 실행:

```bash
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_REGION=${REGION},_PROJECT_ID=$(gcloud config get-value project),_DB_INSTANCE=<PROJECT>:${REGION}:reboot-pg \
  .
```

파이프라인은 다음 순서로 진행된다:

1. `api` 이미지 빌드 → Artifact Registry 푸시
2. `eduation-media-api` 서비스를 Cloud Run 에 배포 (Cloud SQL 부착, Secret 주입)
3. `web` 이미지 빌드 → 푸시
4. `eduation-media-web` 서비스 배포 (`NEXT_PUBLIC_API_BASE` 를 api 서비스 URL로 지정)

배포 완료 후:

```bash
gcloud run services describe eduation-media-api --region=${REGION} --format='value(status.url)'
gcloud run services describe eduation-media-web --region=${REGION} --format='value(status.url)'
```

---

## 5. DB 마이그레이션 & 시드

첫 배포 직후 alembic 마이그레이션을 한 번 수동 실행한다.

```bash
# 방법 A) Cloud Run Jobs 로 실행 (권장)
gcloud run jobs create reboot-migrate \
  --image=${REGION}-docker.pkg.dev/$(gcloud config get-value project)/reboot/api:latest \
  --region=${REGION} \
  --set-cloudsql-instances=<PROJECT>:${REGION}:reboot-pg \
  --set-secrets=DATABASE_URL=DATABASE_URL:latest \
  --command=alembic --args=upgrade,head
gcloud run jobs execute reboot-migrate --region=${REGION} --wait

# 방법 B) 로컬에서 Cloud SQL Auth Proxy 경유 실행
```

그 다음 튜터 시드 문서를 주입한다:

```bash
REBOOT_API_BASE=https://eduation-media-api-xxxxx.a.run.app \
  python scripts/seed_mlai_docs.py
```

---

## 6. 커스텀 도메인 연결 (선택)

```bash
gcloud run domain-mappings create \
  --service=eduation-media-web \
  --domain=reboot.example.ac.kr \
  --region=${REGION}
```

도메인 소유권 확인 후, 출력되는 DNS 레코드를 도메인 제공사에 등록하면 TLS 가 자동으로 발급된다.

---

## 7. 로그 및 모니터링

```bash
# 실시간 로그 스트리밍
gcloud run services logs tail eduation-media-api --region=${REGION}
gcloud run services logs tail eduation-media-web --region=${REGION}

# 최근 100줄
gcloud run services logs read eduation-media-api --region=${REGION} --limit=100
```

Cloud Console의 **Logs Explorer** 와 **Cloud Monitoring** 에서 요청률, 지연, 오류율 지표를 확인할 수 있다. 학회 당일에는 간단한 Uptime Check 1개를 걸어두는 것을 권장한다.

---

## 8. 예상 비용 (데모 스케일)

| 항목 | 가정 | 월 예상 |
|---|---|---|
| Cloud Run (api) | `min=0 max=3`, 일 1~2시간 사용 | $2 ~ $6 |
| Cloud Run (web) | 동일 | $1 ~ $4 |
| Artifact Registry | < 5GB | $0.5 |
| Cloud SQL (`db-f1-micro`) | 상시 가동 | $10 ~ $15 |
| Cloud Build | 월 120분 무료 한도 내 | $0 |
| Secret Manager | < 10 secret | $0 ~ $1 |
| Egress | 소량 | $1 ~ $3 |
| **합계** | | **≈ $30 ~ $50 / 월** |

> 학회 발표 기간(약 2주) 만 운영한다면 Cloud SQL 을 켰다 껐다 하여 $15 안쪽으로도 운영 가능하다. 단, Cloud SQL은 중지되어 있어도 스토리지 비용이 일부 과금된다.

---

## 9. 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| `DATABASE_URL` 접속 실패 | 서비스 계정에 `Cloud SQL Client` 권한이 있는지, 인스턴스 커넥션 이름이 정확한지 확인 |
| Next.js 이미지에서 `NEXT_PUBLIC_*` 누락 | `NEXT_PUBLIC_*` 은 **빌드 타임**에 주입되어야 하므로 Dockerfile 내 `ARG` → `ENV` 흐름 점검 |
| Cold start 지연 | `--min-instances=1` 로 변경 (월 $5 가량 추가) |
| 시크릿 접근 거부 | `roles/secretmanager.secretAccessor` 바인딩 누락 |

---

## 10. 롤백

```bash
gcloud run services update-traffic eduation-media-api \
  --region=${REGION} \
  --to-revisions=<이전_revision>=100
```

Cloud Run 은 리비전 단위로 트래픽을 분할/롤백할 수 있다. 문제가 생기면 즉시 직전 리비전으로 100% 돌리는 것이 가장 안전하다.
