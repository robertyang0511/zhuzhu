#!/usr/bin/env python3
"""本地预览服务：始终从本脚本所在目录（项目根）提供静态文件。"""
import http.server
import os
import socketserver
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(ROOT, "index.html")
PORT = int(os.environ.get("PORT", "8080"))


def main() -> None:
    if not os.path.isfile(INDEX):
        print("")
        print("❌ 未找到 index.html，请确认在 zhuzhu 项目根目录运行。")
        print(f"   当前目录: {ROOT}")
        print("")
        print("   正确做法：")
        print("   1. cd 到包含 index.html 的 zhuzhu 文件夹")
        print("   2. 运行 ./start.sh 或 start.bat")
        print("")
        sys.exit(1)

    os.chdir(ROOT)
    url = f"http://127.0.0.1:{PORT}/index.html"

    print("")
    print("============================================")
    print(" 疯狂水世界攻略 - 本地预览")
    print("============================================")
    print(f"  目录: {ROOT}")
    print(f"  打开: {url}")
    print("")
    print("  ⚠️  请保持此窗口不要关闭")
    print("  按 Ctrl+C 停止")
    print("============================================")
    print("")

    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("127.0.0.1", PORT), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n已停止服务")


if __name__ == "__main__":
    main()
