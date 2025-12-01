# MongoDB Setup for Railway

## Quick Setup (5 minutes)

### Option 1: MongoDB Atlas (Recommended - Free)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a free M0 cluster (512MB)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/chess-game`)
6. Run this command:

```bash
railway variables --set MONGODB_URI="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/chess-game?retryWrites=true&w=majority"
```

### Option 2: Railway MongoDB Plugin

1. Open Railway dashboard: `railway open`
2. Click "+ New" button
3. Select "Database" → "Add MongoDB"
4. Once created, go to your service variables
5. Add reference to MongoDB's MONGO_URL variable

### After Setting Up MongoDB

Deploy your app:
```bash
railway up
```

Your app will be live at: https://fullstack-chess-production.up.railway.app
