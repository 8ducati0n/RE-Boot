#!/usr/bin/env bash
# RE:Boot 로컬 스모크 테스트
# Usage: ./scripts/local_smoke.sh
#
# 모든 서비스가 기동 상태에서 주요 엔드포인트가 살아있는지 한번에 검증한다.
# Cloud Run 배포 전 최종 확인용.

set -u
API="http://localhost:8002"
WEB="http://localhost:5273"
LANDING="$WEB"   # Next.js 앱이 단일 랜딩

c_ok='\033[0;32m'; c_err='\033[0;31m'; c_dim='\033[0;90m'; c_cy='\033[0;36m'; c_rst='\033[0m'
pass=0; fail=0
check() {
  local name="$1"; local cmd="$2"
  printf "  %-48s " "$name"
  if eval "$cmd" >/dev/null 2>&1; then
    printf "${c_ok}✓${c_rst}\n"; pass=$((pass+1))
  else
    printf "${c_err}✗${c_rst}\n"; fail=$((fail+1))
  fi
}

echo -e "${c_cy}══ 1. 컨테이너 상태 ══${c_rst}"
docker compose ps --format "  {{.Name}}\t{{.Status}}" 2>&1 | sed 's/^/  /'

echo -e "\n${c_cy}══ 2. 헬스 엔드포인트 ══${c_rst}"
check "GET $API/health"            "curl -fs $API/health"
check "GET $API/docs (OpenAPI UI)" "curl -fs $API/docs"
check "GET $WEB  (Next.js)"        "curl -fs -o /dev/null $WEB"

echo -e "\n${c_cy}══ 3. 인증 ══${c_rst}"
TOKEN_STU=$(curl -fs -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"student@demo.re","password":"student1234"}' | python3 -c "import sys,json; print(json.load(sys.stdin).get('access_token',''))" 2>/dev/null)
TOKEN_INS=$(curl -fs -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"instructor@demo.re","password":"instructor1234"}' | python3 -c "import sys,json; print(json.load(sys.stdin).get('access_token',''))" 2>/dev/null)
if [ -n "$TOKEN_STU" ]; then printf "  %-48s ${c_ok}✓${c_rst}\n" "POST /api/auth/login (student)"; pass=$((pass+1)); else printf "  %-48s ${c_err}✗${c_rst}\n" "POST /api/auth/login (student)"; fail=$((fail+1)); fi
if [ -n "$TOKEN_INS" ]; then printf "  %-48s ${c_ok}✓${c_rst}\n" "POST /api/auth/login (instructor)"; pass=$((pass+1)); else printf "  %-48s ${c_err}✗${c_rst}\n" "POST /api/auth/login (instructor)"; fail=$((fail+1)); fi

echo -e "\n${c_cy}══ 4. 학생 데이터 엔드포인트 ══${c_rst}"
H_STU="Authorization: Bearer $TOKEN_STU"
check "GET /api/auth/me"                          "curl -fs -H '$H_STU' $API/api/auth/me"
check "GET /api/diagnose/questions (15개)"         "curl -fs -H '$H_STU' $API/api/diagnose/questions | python3 -c 'import sys,json;sys.exit(0 if len(json.load(sys.stdin))==15 else 1)'"
check "GET /api/diagnose/gap-map (5 categories)"   "curl -fs -H '$H_STU' $API/api/diagnose/gap-map | python3 -c 'import sys,json;d=json.load(sys.stdin);sys.exit(0 if len(d.get(\"categories\",{}))==5 else 1)'"
check "GET /api/adapt/curriculum (10 items)"       "curl -fs -H '$H_STU' $API/api/adapt/curriculum | python3 -c 'import sys,json;d=json.load(sys.stdin);sys.exit(0 if len(d.get(\"items\",[]))==10 else 1)'"
check "GET /api/mastery/spaced-repetition/due"     "curl -fs -H '$H_STU' $API/api/mastery/spaced-repetition/due | python3 -c 'import sys,json;sys.exit(0 if isinstance(json.load(sys.stdin),list) else 1)'"

echo -e "\n${c_cy}══ 5. 교수자 대시보드 엔드포인트 ══${c_rst}"
H_INS="Authorization: Bearer $TOKEN_INS"
check "GET /api/adapt/recommendations (PENDING 3)" "curl -fs -H '$H_INS' '$API/api/adapt/recommendations?status=PENDING_APPROVAL' | python3 -c 'import sys,json;d=json.load(sys.stdin);sys.exit(0 if len(d)==3 else 1)'"
check "GET /api/analytics/weak-zones (3건)"        "curl -fs -H '$H_INS' $API/api/analytics/weak-zones | python3 -c 'import sys,json;d=json.load(sys.stdin);sys.exit(0 if len(d)==3 else 1)'"
check "GET /api/analytics/at-risk"                 "curl -fs -H '$H_INS' $API/api/analytics/at-risk"

echo -e "\n${c_cy}══ 6. Tutor 세션 목록 ══${c_rst}"
check "GET /api/tutor/sessions"                    "curl -fs -H '$H_STU' $API/api/tutor/sessions"

echo -e "\n${c_cy}══ 7. 데이터베이스 청크 카운트 ══${c_rst}"
CHUNKS=$(docker compose exec -T db psql -U reboot -d eduation_media -tAc "SELECT COUNT(*) FROM document_chunks" 2>/dev/null | tr -d ' \n\r')
printf "  %-48s " "document_chunks 행 수"
if [ "$CHUNKS" = "15" ]; then printf "${c_ok}✓ 15${c_rst}\n"; pass=$((pass+1)); else printf "${c_err}✗ $CHUNKS${c_rst}\n"; fail=$((fail+1)); fi

echo -e "\n${c_cy}══ 요약 ══${c_rst}"
TOTAL=$((pass+fail))
if [ $fail -eq 0 ]; then
  echo -e "  ${c_ok}✓ $pass/$TOTAL 통과 — 배포 준비 완료${c_rst}"
else
  echo -e "  ${c_err}✗ $fail/$TOTAL 실패 — 수정 필요${c_rst}"
fi

echo -e "\n${c_cy}══ 시연 URL ══${c_rst}"
cat <<URLS
  ${c_dim}[정적 랜딩]${c_rst}          $LANDING
  ${c_dim}[Next.js 앱]${c_rst}         $WEB
  ${c_dim}[API OpenAPI docs]${c_rst}   $API/docs
  ${c_dim}[팔레트 비교]${c_rst}        (deleted)

  ${c_dim}[데모 계정]${c_rst}
    학생   : student@demo.re    / student1234
    교수자 : instructor@demo.re / instructor1234
    매니저 : manager@demo.re    / manager1234

  ${c_dim}[Agentic RAG 튜터 테스트 한 줄]${c_rst}
    curl -sN -X POST $API/api/tutor/chat \\
      -H "Content-Type: application/json" \\
      -H "Authorization: Bearer \$(curl -s -X POST $API/api/auth/login \\
          -H 'Content-Type: application/json' \\
          -d '{\"email\":\"student@demo.re\",\"password\":\"student1234\"}' \\
          | python3 -c \"import sys,json;print(json.load(sys.stdin)['access_token'])\")" \\
      -d '{"messages":[{"role":"user","content":"L2 정규화의 원리를 설명해주세요"}]}'
URLS

exit $fail
