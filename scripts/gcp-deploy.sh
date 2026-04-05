#!/usr/bin/env bash
# RE:Boot Cloud Run 배포 (Cloud Shell 에서 실행)
# ----------------------------------------------------------------------
# 2-step build:
#   1차) API + 임시 WEB 배포 → API URL 획득
#   2차) 획득한 API URL 을 WEB build arg 로 주입해서 재배포
#
# 실행 전 gcp-setup.sh 가 완료되어 있어야 한다.

set -euo pipefail

PROJECT="${PROJECT:-edumedia-492410}"
REGION="${REGION:-asia-northeast3}"
DB_INSTANCE_NAME="${DB_INSTANCE_NAME:-reboot-pg}"
API_SERVICE="eduation-media-api"
WEB_SERVICE="eduation-media-web"

INSTANCE_CONNECTION="$PROJECT:$REGION:$DB_INSTANCE_NAME"

c_ok='\033[0;32m'; c_info='\033[0;36m'; c_rst='\033[0m'
log()  { echo -e "${c_info}▸${c_rst} $*"; }
ok()   { echo -e "  ${c_ok}✓${c_rst} $*"; }

gcloud config set project "$PROJECT" >/dev/null

# ─────────────────────────────────────────────────────────────────────
log "1/3  [Phase 1] API 및 초기 WEB 빌드 (임시 URL)"
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions="_REGION=$REGION,_PROJECT_ID=$PROJECT,_DB_INSTANCE=$INSTANCE_CONNECTION,_API_URL=,_WEB_URL=" \
  .

# ─────────────────────────────────────────────────────────────────────
log "2/3  Cloud Run 서비스 URL 획득"
API_URL=$(gcloud run services describe "$API_SERVICE" --region="$REGION" --format='value(status.url)')
WEB_URL=$(gcloud run services describe "$WEB_SERVICE" --region="$REGION" --format='value(status.url)')
ok "API_URL = $API_URL"
ok "WEB_URL = $WEB_URL"

# ─────────────────────────────────────────────────────────────────────
log "3/3  [Phase 2] WEB 재빌드 (실제 API URL baked) + API 재배포 (CORS 업데이트)"
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions="_REGION=$REGION,_PROJECT_ID=$PROJECT,_DB_INSTANCE=$INSTANCE_CONNECTION,_API_URL=$API_URL,_WEB_URL=$WEB_URL" \
  .

# ─────────────────────────────────────────────────────────────────────
echo
cat <<SUMMARY

${c_ok}✅ 배포 완료${c_rst}

  Web (학습자/교수자 앱)  : $WEB_URL
  API (OpenAPI docs)     : $API_URL/docs
  Health                 : $API_URL/health

  ${c_info}데모 계정${c_rst}
    학생   : student@demo.re    / student1234
    교수자 : instructor@demo.re / instructor1234
    매니저 : manager@demo.re    / manager1234

  AUTO_BOOTSTRAP=true 이므로 API 첫 부팅 시 테이블/시드 데이터가
  자동 생성됩니다. 첫 접속이 살짝 느릴 수 있어요 (콜드 스타트 5~15초).

  로그 실시간 확인:
    gcloud run services logs tail $API_SERVICE --region=$REGION
    gcloud run services logs tail $WEB_SERVICE --region=$REGION

SUMMARY
