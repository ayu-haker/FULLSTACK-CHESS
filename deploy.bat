@echo off
REM Chess Game Deployment Script for Windows

echo.
echo ========================================
echo    Chess Game Deployment Helper
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - Chess game ready for deployment"
    echo Git initialized successfully!
) else (
    echo Git already initialized
)

echo.
echo ========================================
echo    Next Steps:
echo ========================================
echo.
echo 1. Create a GitHub repository at:
echo    https://github.com/new
echo.
echo 2. Run these commands:
echo    git remote add origin https://github.com/YOUR_USERNAME/chess-game.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Deploy to Vercel:
echo    - Go to https://vercel.com
echo    - Click 'New Project'
echo    - Import your GitHub repository
echo    - Add environment variables (see DEPLOY_NOW.md)
echo    - Deploy!
echo.
echo Full instructions: See DEPLOY_NOW.md
echo.
pause
