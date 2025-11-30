# Deploying Chess Game to Vercel

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Vercel Account** - Sign up at https://vercel.com
3. **MongoDB Atlas** - Free cloud database at https://www.mongodb.com/cloud/atlas

## Step 1: Setup MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string, it looks like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/chess-game
   ```
6. Replace `<password>` with your actual password
7. Replace `myFirstDatabase` with `chess-game`

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Chess game"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chess-game.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add Environment Variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Any random secret key (e.g., `my-super-secret-key-12345`)
   - `NODE_ENV` = `production`
5. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

## Step 4: Configure Environment Variables

In Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add these variables:

| Name | Value | Example |
|------|-------|---------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/chess-game` |
| `JWT_SECRET` | Random secret string | `your-super-secret-jwt-key-change-this` |
| `NODE_ENV` | production | `production` |

## Important Notes

### ⚠️ WebSocket Limitations on Vercel

Vercel's serverless functions have a 10-second timeout, which can affect real-time features. For production, consider:

1. **Use Vercel for frontend only** and deploy backend separately on:
   - Railway.app (supports WebSockets)
   - Render.com (free tier available)
   - Heroku
   - DigitalOcean

2. **Or use Vercel with external WebSocket service**:
   - Pusher
   - Ably
   - Socket.io with Redis adapter

### Recommended Production Setup

**Frontend (Vercel):**
- Serves static files
- Handles authentication API routes

**Backend (Railway/Render):**
- Handles WebSocket connections
- Real-time game logic

## Alternative: Deploy Backend to Railway

1. Go to https://railway.app
2. Create new project from GitHub
3. Add environment variables (same as above)
4. Deploy
5. Update your Vercel frontend to connect to Railway backend URL

## Testing Your Deployment

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Register a new account
3. Test offline mode first
4. Test online features with a friend

## Troubleshooting

### MongoDB Connection Failed
- Check your MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for all IPs)
- Verify connection string is correct
- Check database user has read/write permissions

### WebSocket Not Working
- Vercel has limitations with WebSockets
- Consider deploying backend separately (Railway/Render)

### Environment Variables Not Working
- Redeploy after adding environment variables
- Check variable names match exactly

## Cost

- **Vercel**: Free tier (hobby plan)
- **MongoDB Atlas**: Free tier (512MB)
- **Railway**: Free tier ($5 credit/month)

Total: **$0/month** for small usage!

## Support

For issues, check:
- Vercel logs in dashboard
- MongoDB Atlas monitoring
- Browser console (F12)
