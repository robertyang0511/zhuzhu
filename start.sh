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
  echo "❌ 未找到 python3，请先安装 Python 3"
  echo ""
  exit 1
fi

if [ ! -f "index.html" ]; then
  echo ""
  echo "❌ 当前文件夹没有 index.html，请 cd 到 zhuzhu 项目根目录再运行"
  echo "   当前路径: $(pwd)"
  echo ""
  exit 1
fi

if [ -n "${PORT:-}" ]; then
  export PORT
else
  export PORT="$(find_free_port 8080)"
fi

exec python3 serve.py
