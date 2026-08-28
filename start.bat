@echo off
chcp 65001 >nul
cd /d "%~dp0"

where python >nul 2>&1
if errorlevel 1 (
  where py >nul 2>&1
  if errorlevel 1 (
    echo.
    echo ❌ 未找到 Python，请先安装：
    echo    https://www.python.org/downloads/
    echo    安装时勾选 "Add Python to PATH"
    echo.
    pause
    exit /b 1
  )
  set PY=py -3
) else (
  set PY=python
)

set PORT=8080

echo.
echo ============================================
echo  疯狂水世界攻略 - 本地预览
echo ============================================
echo.
echo  ✅ 服务启动后，用浏览器打开：
echo     http://127.0.0.1:%PORT%
echo.
echo  ⚠️  请保持此窗口不要关闭（关闭=服务停止）
echo  ⚠️  不要直接双击 index.html
echo  按 Ctrl+C 停止服务
echo ============================================
echo.

%PY% -m http.server %PORT% --bind 127.0.0.1
pause
