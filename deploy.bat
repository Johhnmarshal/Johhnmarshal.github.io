@echo off
REM ============================================================
REM  Tobi Olabode FinOps Portfolio - GitHub Pages deployment
REM  Pre-configured to push to: Johhnmarshal/Johhnmarshal.github.io
REM  (Edit REPO_URL below if you use a different account/repo.)
REM ============================================================

set REPO_URL=https://github.com/Johhnmarshal/Johhnmarshal.github.io.git

cd /d "%~dp0"

echo.
echo ============================================================
echo  Deploying to:  %REPO_URL%
echo ============================================================
echo.

REM --- Sanity check that git is available ---
where git >nul 2>nul
if errorlevel 1 (
    echo [ERROR] git is not installed or not in PATH.
    echo  Install Git for Windows from https://git-scm.com/download/win
    pause
    exit /b 1
)

REM --- Initialise repo if needed ---
if not exist .git (
    echo --- Initialising git repo ---
    git init -b main
    if errorlevel 1 (
        echo [ERROR] git init failed.
        pause
        exit /b 1
    )
)

echo.
echo --- Removing .nojekyll from repo (Jekyll must run to build the blog) ---
git rm --cached --ignore-unmatch .nojekyll >nul 2>nul

echo.
echo --- Staging files ---
git add .

echo.
echo --- Committing ---
git commit -m "Update portfolio" 2>nul
if errorlevel 1 echo (Nothing new to commit, continuing...)

REM --- Add remote if missing ---
git remote get-url origin >nul 2>nul
if errorlevel 1 (
    echo --- Adding remote origin ---
    git remote add origin %REPO_URL%
)

echo.
echo --- Pushing to main ---
git push -u origin main
if errorlevel 1 (
    echo.
    echo [WARN] Push failed. Common causes:
    echo   - The repo doesn't exist yet on GitHub. Create it first:
    echo       https://github.com/new   (name it: Johhnmarshal.github.io, Public)
    echo   - Authentication needed. A browser window may pop up - sign in.
    echo   - First-time push to a non-empty remote: try
    echo       git push -u origin main --force
    pause
    exit /b 1
)

echo.
echo ============================================================
echo  SUCCESS! Code pushed.
echo.
echo  One-time setup: enable GitHub Pages
echo    1. https://github.com/Johhnmarshal/Johhnmarshal.github.io/settings/pages
echo    2. Source = Deploy from a branch, Branch = main, folder = / (root)
echo    3. Save. Wait ~1 minute.
echo.
echo  Then visit:  https://johhnmarshal.github.io
echo ============================================================
pause
