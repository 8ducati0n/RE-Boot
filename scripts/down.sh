#!/usr/bin/env bash
# RE:Boot 종료 스크립트
# Usage: ./scripts/down.sh [--clean]
#   --clean : 볼륨도 전부 삭제 (DB 데이터 초기화)

set -e
cd "$(dirname "$0")/.."

if [ "$1" = "--clean" ]; then
  echo "▸ 컨테이너 + 볼륨 전부 제거"
  docker compose down -v
  echo "✓ 완전 초기화 완료 (다음 up.sh 실행 시 재시드)"
else
  echo "▸ 컨테이너 정지 (볼륨 유지)"
  docker compose down
  echo "✓ 정지 완료. 재시작: ./scripts/up.sh"
fi
