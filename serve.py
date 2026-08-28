#!/usr/bin/env python3
"""本地预览服务：始终从项目根目录提供静态文件，兼容 /zhuzhu/ 路径。"""
import http.server
import os
import socketserver
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(ROOT, "index.html")
PORT = int(os.environ.get("PORT", "8080"))
BASE_PREFIX = "/zhuzhu"


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self) -> None:
        path = urllib.parse.unquote(self.path.split("?", 1)[0])

        if path in ("", "/"):
            self.send_response(302)
            self.send_header("Location", "/index.html")
            self.end_headers()
            return

        if path in (BASE_PREFIX, f"{BASE_PREFIX}/"):
            self.send_response(302)
            self.send_header("Location", f"{BASE_PREFIX}/index.html")
            self.end_headers()
            return

        if path.startswith(f"{BASE_PREFIX}/"):
            self.path = path[len(BASE_PREFIX) :] or "/index.html"
            if self.path == "/":
                self.path = "/index.html"

        if path == "/index.html" and not os.path.isfile(INDEX):
            self.send_error(404, "index.html not found in project root")
            return

        return super().do_GET()

    def log_message(self, fmt: str, *args) -> None:
        sys.stdout.write("%s - %s\n" % (self.address_string(), fmt % args))


def main() -> None:
    if not os.path.isfile(INDEX):
        print("")
        print("❌ 未找到 index.html")
        print(f"   当前目录: {ROOT}")
        print("")
        print("   请 cd 到 zhuzhu 项目根目录（含 index.html 的文件夹）再运行")
        print("")
        sys.exit(1)

    os.chdir(ROOT)
    urls = [
        f"http://127.0.0.1:{PORT}/",
        f"http://127.0.0.1:{PORT}/index.html",
        f"http://127.0.0.1:{PORT}{BASE_PREFIX}/",
    ]

    print("")
    print("============================================")
    print(" 疯狂水世界攻略 - 本地预览")
    print("============================================")
    print(f"  目录: {ROOT}")
    print("  用浏览器打开（任选其一）：")
    for url in urls:
        print(f"    → {url}")
    print("")
    print("  ⚠️  本地不要用 github.io 链接")
    print("  ⚠️  请保持此窗口不要关闭")
    print("  按 Ctrl+C 停止")
    print("============================================")
    print("")

    with socketserver.TCPServer(("127.0.0.1", PORT), PreviewHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n已停止服务")
        except OSError as err:
            print(f"\n❌ 启动失败: {err}")
            print(f"   可换端口: PORT={PORT + 1} ./start.sh")
            sys.exit(1)


if __name__ == "__main__":
    main()
