#!/usr/bin/env bash
# 本地预览启动脚本（Mac / Linux）
cd "$(dirname "$0")"

find_free_port() {
  local port="${1:-8080}"
  local max=$((port + 20))
  while [ "$port" -le "$max" ]; do
    if ! command -v lsof >/dev/null 2>&1; then
      echo "$port"
      return 0
    fi
    if ! lsof -i ":$port" -sTCP:LISTEN -t >/dev/null 2>&1; then
      echo "$port"
      return 0
    fi
    port=$((port + 1))
  done
  echo "8080"
}

if ! command -v python3 >/dev/null 2>&1; then
  echo ""
  echo "❌ 未找到 python3，请先安装 Python 3："
  echo "   Mac: brew install python3"
  echo "   或访问 https://www.python.org/downloads/"
  echo ""
  exit 1
fi

if [ -n "${PORT:-}" ]; then
  PORT="$PORT"
else
  PORT="$(find_free_port 8080)"
fi

echo ""
echo "============================================"
echo " 疯狂水世界攻略 - 本地预览"
echo "============================================"
echo ""
echo "  ✅ 服务启动后，用浏览器打开："
echo "     http://127.0.0.1:${PORT}"
echo ""
echo "  ⚠️  请保持此窗口不要关闭（关闭=服务停止）"
echo "  ⚠️  不要直接双击 index.html"
echo "  按 Ctrl+C 停止服务"
echo "============================================"
echo ""

exec python3 -m http.server "$PORT" --bind 127.0.0.1
