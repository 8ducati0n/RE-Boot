#!/usr/bin/env bash
# RE:Boot 원클릭 기동 스크립트
# Usage: ./scripts/up.sh
#
# 동작:
#   1) 기존 컨테이너 모두 정리
#   2) 최신 이미지로 재빌드 + 기동 (db → api → web)
#   3) DB 부트스트랩 + 데모 시드 (최초 또는 DB 볼륨 초기화 시만)
#   4) 헬스체크 대기
#   5) 브라우저에 로그인 페이지 자동 오픈

set -e
cd "$(dirname "$0")/.."

c_ok='\033[0;32m'; c_cy='\033[0;36m'; c_dim='\033[0;90m'; c_rst='\033[0m'

echo -e "${c_cy}▸ 1/5  기존 컨테이너 정리${c_rst}"
docker compose down 2>/dev/null || true

echo -e "${c_cy}▸ 2/5  이미지 빌드 + 기동${c_rst}"
docker compose up -d --build

echo -e "${c_cy}▸ 3/5  서비스 헬스체크 대기…${c_rst}"
for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fs http://localhost:8002/health >/dev/null 2>&1; then
    echo -e "  ${c_ok}✓${c_rst} API ready"
    break
  fi
  sleep 2
done
for i in 1 2 3 4 5; do
  if curl -fs http://localhost:5273 >/dev/null 2>&1; then
    echo -e "  ${c_ok}✓${c_rst} Web ready"
    break
  fi
  sleep 2
done

echo -e "${c_cy}▸ 4/5  DB 부트스트랩 + 시드 (필요 시)${c_rst}"
# DB 가 비어있으면 부트스트랩 + 시드, 이미 있으면 skip
NEED_SEED=$(docker compose exec -T db psql -U reboot -d eduation_media -tAc \
  "SELECT CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='users') THEN (SELECT count(*) FROM users)::text ELSE 'missing' END" 2>/dev/null | tr -d ' \n\r' || echo "missing")

if [ "$NEED_SEED" = "missing" ] || [ "$NEED_SEED" = "0" ]; then
  echo "  users 테이블 비어있음 → 부트스트랩 + 시드 실행"
  docker compose exec -T api python -m app.bootstrap_db 2>&1 | tail -5
  docker compose exec -T api python -m app.rebuild_tutor_schema 2>&1 | tail -3
  docker compose exec -T api python -m app.seed_demo 2>&1 | tail -5
  # RAG 시드는 유효한 Gemini 키가 .env 에 있을 때만
  if grep -q "^GEMINI_API_KEY=AIza" .env 2>/dev/null; then
    echo "  RAG 문서 시드 (Gemini 임베딩)…"
    TOKEN=$(curl -s -X POST http://localhost:8002/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"instructor@demo.re","password":"instructor1234"}' \
      | python3 -c "import sys,json;print(json.load(sys.stdin).get('access_token',''))" 2>/dev/null)
    if [ -n "$TOKEN" ]; then
      REBOOT_API_BASE=http://localhost:8002 INSTRUCTOR_TOKEN="$TOKEN" \
        python3 scripts/seed_mlai_docs.py 2>&1 | tail -3
    fi
  fi
else
  echo -e "  ${c_ok}✓${c_rst} users 테이블 존재 (${NEED_SEED}명) — 시드 skip"
fi

echo -e "${c_cy}▸ 5/5  브라우저 오픈${c_rst}"
open "http://localhost:5273/auth" 2>/dev/null || \
  xdg-open "http://localhost:5273/auth" 2>/dev/null || \
  echo "  브라우저 수동으로 http://localhost:5273/auth 열어주세요"

cat <<EOF

${c_ok}✓ RE:Boot 기동 완료${c_rst}

  ${c_dim}[앱]${c_rst}     http://localhost:5273
  ${c_dim}[API]${c_rst}    http://localhost:8002/docs
  ${c_dim}[DB]${c_rst}     localhost:5433

  ${c_dim}[데모 계정]${c_rst}
    학생   : student@demo.re    / student1234
    교수자 : instructor@demo.re / instructor1234
    매니저 : manager@demo.re    / manager1234

  ${c_dim}[종료]${c_rst}   ./scripts/down.sh

EOF
