#!/usr/bin/env bash
# 本地预览启动脚本（必须在项目根目录运行）
set -euo pipefail
cd "$(dirname "$0")"

PORT="${PORT:-8080}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "错误：未找到 python3，请先安装 Python 3"
  exit 1
fi

if command -v lsof >/dev/null 2>&1 && lsof -i ":$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "端口 $PORT 已被占用，可改用: PORT=8081 ./start.sh"
  exit 1
fi

echo "============================================"
echo " 疯狂水世界攻略 - 本地预览"
echo "============================================"
echo ""
echo "  本机访问:  http://127.0.0.1:${PORT}"
echo "  局域网访问: http://$(hostname -I 2>/dev/null | awk '{print $1}' || echo '你的IP'):${PORT}"
echo ""
echo "  注意：请用以上地址打开，不要直接双击 index.html"
echo "  按 Ctrl+C 停止服务"
echo "============================================"
echo ""

exec python3 -m http.server "$PORT" --bind 0.0.0.0
