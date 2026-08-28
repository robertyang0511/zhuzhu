@echo off
chcp 65001 >nul
cd /d "%~dp0"

if not exist "index.html" (
  echo.
  echo ❌ 当前文件夹没有 index.html
  echo    请进入 zhuzhu 项目根目录再运行 start.bat
  echo    当前路径: %CD%
  echo.
  pause
  exit /b 1
)

where python >nul 2>&1
if errorlevel 1 (
  where py >nul 2>&1
  if errorlevel 1 (
    echo.
    echo ❌ 未找到 Python，请先安装：https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
  )
  set PY=py -3
) else (
  set PY=python
)

set PORT=8080
%PY% serve.py
pause
