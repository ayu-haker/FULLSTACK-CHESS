@echo off
echo.
echo ========================================
echo    DEPLOYING TO VERCEL
echo ========================================
echo.
echo Starting Vercel deployment...
echo.
echo You will be asked several questions:
echo.
echo 1. "Set up and deploy?" - Press ENTER (Yes)
echo 2. "Which scope?" - Choose your account
echo 3. "Link to existing project?" - Type: N (No)
echo 4. "Project name?" - Type: chess-game
echo 5. "Directory?" - Press ENTER (./)
echo 6. "Override settings?" - Type: N (No)
echo.
echo ========================================
echo.
pause
echo.
vercel
echo.
echo ========================================
echo    DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Copy your Vercel URL from above
echo 2. Go to: https://vercel.com/dashboard
echo 3. Click your project
echo 4. Add environment variables:
echo    - MONGODB_URI (get from MongoDB Atlas)
echo    - JWT_SECRET (any random string)
echo    - NODE_ENV (production)
echo 5. Redeploy
echo.
echo See DEPLOY_INSTRUCTIONS.md for details
echo.
pause
