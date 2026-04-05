#!/usr/bin/env bash
# RE:Boot GCP 환경 세팅 (Cloud Shell 에서 1회 실행)
# ----------------------------------------------------------------------
# 이 스크립트는 edumedia-492410 프로젝트에 RE:Boot 배포 환경을 준비한다.
# 이미 존재하는 리소스는 skip 한다 (idempotent).
#
# Usage:
#   export GEMINI_API_KEY="AIzaSy..."   # 사전에 환경변수로 주입
#   bash scripts/gcp-setup.sh
#
# 준비 완료 후:
#   bash scripts/gcp-deploy.sh           # 실제 배포 실행

set -euo pipefail

PROJECT="${PROJECT:-edumedia-492410}"
REGION="${REGION:-asia-northeast3}"
DB_INSTANCE_NAME="${DB_INSTANCE_NAME:-reboot-pg}"
DB_DATABASE="${DB_DATABASE:-eduation_media}"
REPO="${REPO:-reboot}"

c_ok='\033[0;32m'; c_info='\033[0;36m'; c_warn='\033[0;33m'; c_rst='\033[0m'
log()  { echo -e "${c_info}▸${c_rst} $*"; }
ok()   { echo -e "  ${c_ok}✓${c_rst} $*"; }
warn() { echo -e "  ${c_warn}⚠${c_rst} $*"; }

if [ -z "${GEMINI_API_KEY:-}" ]; then
  warn "GEMINI_API_KEY 환경변수가 비어있습니다. Secret Manager 등록 단계가 실패할 수 있습니다."
  echo "  export GEMINI_API_KEY=\"AIzaSy...\" 먼저 실행하세요."
fi

gcloud config set project "$PROJECT" >/dev/null
log "프로젝트: $PROJECT / 리전: $REGION"

# ─────────────────────────────────────────────────────────────────────
log "1/7  GCP API 활성화"
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  compute.googleapis.com \
  --quiet
ok "API 활성화 완료"

# ─────────────────────────────────────────────────────────────────────
log "2/7  Artifact Registry 리포지토리 ($REPO)"
if gcloud artifacts repositories describe "$REPO" --location="$REGION" >/dev/null 2>&1; then
  ok "이미 존재 — skip"
else
  gcloud artifacts repositories create "$REPO" \
    --repository-format=docker \
    --location="$REGION" \
    --description="RE:Boot images" \
    --quiet
  ok "생성 완료"
fi

# ─────────────────────────────────────────────────────────────────────
log "3/7  Cloud SQL 인스턴스 ($DB_INSTANCE_NAME, PostgreSQL 16)"
if gcloud sql instances describe "$DB_INSTANCE_NAME" >/dev/null 2>&1; then
  ok "이미 존재 — skip (약 5~10분 소요되는 단계)"
else
  echo "    ⏱️  Cloud SQL 생성에는 약 5~10분이 소요됩니다…"
  gcloud sql instances create "$DB_INSTANCE_NAME" \
    --database-version=POSTGRES_16 \
    --tier=db-f1-micro \
    --edition=ENTERPRISE \
    --region="$REGION" \
    --storage-size=10GB \
    --storage-type=SSD \
    --quiet
  ok "인스턴스 생성 완료"
fi

# 데이터베이스 생성
if gcloud sql databases describe "$DB_DATABASE" --instance="$DB_INSTANCE_NAME" >/dev/null 2>&1; then
  ok "데이터베이스 ($DB_DATABASE) 이미 존재 — skip"
else
  gcloud sql databases create "$DB_DATABASE" --instance="$DB_INSTANCE_NAME" --quiet
  ok "데이터베이스 ($DB_DATABASE) 생성"
fi

# postgres 사용자 비밀번호 설정
DB_PASSWORD_FILE="$HOME/.reboot-db-password"
if [ -f "$DB_PASSWORD_FILE" ]; then
  DB_PASSWORD=$(cat "$DB_PASSWORD_FILE")
  ok "기존 DB 비밀번호 재사용 ($DB_PASSWORD_FILE)"
else
  DB_PASSWORD=$(openssl rand -hex 20)
  echo -n "$DB_PASSWORD" > "$DB_PASSWORD_FILE"
  chmod 600 "$DB_PASSWORD_FILE"
  gcloud sql users set-password postgres --instance="$DB_INSTANCE_NAME" --password="$DB_PASSWORD" --quiet
  ok "DB 비밀번호 생성 + 저장 ($DB_PASSWORD_FILE)"
fi

INSTANCE_CONNECTION="$PROJECT:$REGION:$DB_INSTANCE_NAME"
log "    Instance connection: $INSTANCE_CONNECTION"

# ─────────────────────────────────────────────────────────────────────
log "4/7  pgvector 확장 활성화 (Cloud SQL Studio 또는 psql)"
# Cloud Shell 에서는 gcloud sql connect 가 IP 화이트리스트 등록이 필요해 느림.
# 대신 cloud-sql-proxy 로 로컬 접속 → psql 명령으로 CREATE EXTENSION.
if command -v cloud-sql-proxy >/dev/null 2>&1 || [ -f ./cloud-sql-proxy ]; then
  ok "cloud-sql-proxy 감지됨"
else
  echo "    cloud-sql-proxy 다운로드…"
  curl -o cloud-sql-proxy -s https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.13.0/cloud-sql-proxy.linux.amd64
  chmod +x cloud-sql-proxy
fi

# proxy 를 background 로 띄우고 psql 실행 후 종료
(./cloud-sql-proxy "$INSTANCE_CONNECTION" --port 5432 >/tmp/csp.log 2>&1) &
PROXY_PID=$!
sleep 3

if command -v psql >/dev/null 2>&1; then
  PGPASSWORD="$DB_PASSWORD" psql -h 127.0.0.1 -U postgres -d "$DB_DATABASE" -c "CREATE EXTENSION IF NOT EXISTS vector;" && ok "pgvector 활성화" || warn "pgvector 활성화 실패 — Cloud SQL Studio 에서 수동 실행 필요"
else
  warn "psql 이 없습니다. Cloud SQL Studio 에서 'CREATE EXTENSION IF NOT EXISTS vector;' 수동 실행 바랍니다."
fi

kill $PROXY_PID 2>/dev/null || true
wait $PROXY_PID 2>/dev/null || true

# ─────────────────────────────────────────────────────────────────────
log "5/7  Secret Manager 시크릿 등록"

create_secret() {
  local name="$1"; local value="$2"
  if gcloud secrets describe "$name" >/dev/null 2>&1; then
    echo -n "$value" | gcloud secrets versions add "$name" --data-file=- --quiet
    ok "$name (새 버전 추가)"
  else
    echo -n "$value" | gcloud secrets create "$name" --data-file=- --quiet
    ok "$name (생성)"
  fi
}

DATABASE_URL="postgresql+asyncpg://postgres:$DB_PASSWORD@/$DB_DATABASE?host=/cloudsql/$INSTANCE_CONNECTION"
JWT_SECRET=$(openssl rand -base64 48)

create_secret "DATABASE_URL" "$DATABASE_URL"
create_secret "JWT_SECRET" "$JWT_SECRET"
if [ -n "${GEMINI_API_KEY:-}" ]; then
  create_secret "GEMINI_API_KEY" "$GEMINI_API_KEY"
else
  warn "GEMINI_API_KEY 환경변수가 없어 secret 등록 skip. 나중에 다음 명령으로 등록:"
  echo "    echo -n 'AIzaSy...' | gcloud secrets create GEMINI_API_KEY --data-file=-"
fi

# ─────────────────────────────────────────────────────────────────────
log "6/7  IAM 권한 부여"
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')
CB_SA="$PROJECT_NUMBER@cloudbuild.gserviceaccount.com"
RUN_SA="$PROJECT_NUMBER-compute@developer.gserviceaccount.com"

# Cloud Build SA 에 필요한 역할
for role in run.admin iam.serviceAccountUser cloudsql.client secretmanager.secretAccessor; do
  gcloud projects add-iam-policy-binding "$PROJECT" \
    --member="serviceAccount:$CB_SA" \
    --role="roles/$role" \
    --quiet >/dev/null
done
ok "Cloud Build SA 권한 부여"

# Cloud Run runtime SA 에 secret / DB 접근 권한
for role in secretmanager.secretAccessor cloudsql.client; do
  gcloud projects add-iam-policy-binding "$PROJECT" \
    --member="serviceAccount:$RUN_SA" \
    --role="roles/$role" \
    --quiet >/dev/null
done
ok "Cloud Run runtime SA 권한 부여"

# ─────────────────────────────────────────────────────────────────────
log "7/8  GitHub Actions 용 Service Account (gh-deploy)"
GH_SA_NAME="gh-deploy"
GH_SA_EMAIL="$GH_SA_NAME@$PROJECT.iam.gserviceaccount.com"
GH_KEY_FILE="$HOME/reboot-gh-deploy-key.json"

if gcloud iam service-accounts describe "$GH_SA_EMAIL" >/dev/null 2>&1; then
  ok "Service Account ($GH_SA_EMAIL) 이미 존재 — 키만 재발급"
else
  gcloud iam service-accounts create "$GH_SA_NAME" \
    --display-name="GitHub Actions Deployer" \
    --project="$PROJECT" --quiet
  ok "Service Account 생성: $GH_SA_EMAIL"
fi

# 권한 부여 (idempotent)
for role in run.admin cloudbuild.builds.editor artifactregistry.writer \
            secretmanager.secretAccessor cloudsql.client \
            iam.serviceAccountUser storage.admin; do
  gcloud projects add-iam-policy-binding "$PROJECT" \
    --member="serviceAccount:$GH_SA_EMAIL" \
    --role="roles/$role" \
    --quiet >/dev/null
done
ok "7개 role 바인딩 완료 (run/cloudbuild/artifacts/secrets/sql/iam/storage)"

# JSON 키 발급
rm -f "$GH_KEY_FILE"
gcloud iam service-accounts keys create "$GH_KEY_FILE" \
  --iam-account="$GH_SA_EMAIL" --quiet
chmod 600 "$GH_KEY_FILE"
ok "SA 키 발급: $GH_KEY_FILE"

# ─────────────────────────────────────────────────────────────────────
log "8/8  준비 완료"
cat <<SUMMARY

${c_ok}✅ GCP 환경 세팅 완료${c_rst}

  Project         : $PROJECT
  Region          : $REGION
  Cloud SQL       : $DB_INSTANCE_NAME
  Connection      : $INSTANCE_CONNECTION
  DB password     : $DB_PASSWORD_FILE 에 저장됨 (절대 공유 금지)
  Secret Manager  : DATABASE_URL / JWT_SECRET / GEMINI_API_KEY
  GitHub SA key   : $GH_KEY_FILE

${c_info}==========================================================
 다음 단계 — 두 가지 경로 중 택 1
==========================================================${c_rst}

${c_info}[A] Cloud Shell 에서 직접 배포 (즉시)${c_rst}
    bash scripts/gcp-deploy.sh

${c_info}[B] GitHub Actions 로 자동 배포 (이후 push 마다)${c_rst}
    1. 다음 명령으로 SA 키 JSON 전체 출력:

       cat $GH_KEY_FILE

    2. 브라우저에서 GitHub 레포 Secrets 페이지 열기:
       https://github.com/8ducati0n/eduation_media/settings/secrets/actions

    3. "New repository secret" 로 3개 등록:
       Name: GCP_SA_KEY        Value: (위에서 출력한 JSON 전체)
       Name: GCP_PROJECT_ID    Value: $PROJECT
       Name: GCP_DB_INSTANCE   Value: $INSTANCE_CONNECTION

    4. Variables 탭에서 1개 등록:
       Name: GCP_SECRETS_READY Value: true

    5. 로컬 git push origin main → GitHub Actions 가 자동 배포

${c_info}로그 실시간 확인 (배포 후)${c_rst}:
    gcloud run services logs tail eduation-media-api --region=$REGION
    gcloud run services logs tail eduation-media-web --region=$REGION

SUMMARY
