# 🚀 Deploy to Vercel - Step by Step

## ✅ Git is Ready!

Your code is committed and ready to deploy.

---

## 📋 Step 1: Get MongoDB Atlas (5 minutes)

**IMPORTANT: Do this FIRST before deploying!**

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free account)
3. Create a **FREE M0 cluster** (takes 3-5 minutes)
4. Create a database user:
   - Username: `chessuser` (or any name)
   - Password: Create a strong password (SAVE THIS!)
5. **Network Access**:
   - Click "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. Get connection string:
   - Click "Database" in left menu
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://chessuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Add `/chess-game` before the `?` like this:
     `mongodb+srv://chessuser:yourpassword@cluster0.xxxxx.mongodb.net/chess-game?retryWrites=true&w=majority`

**SAVE THIS CONNECTION STRING!** You'll need it in Step 3.

---

## 📋 Step 2: Deploy to Vercel

Open a new terminal and run:

```bash
vercel
```

You'll be asked several questions:

1. **"Set up and deploy"** → Press Enter (Yes)
2. **"Which scope"** → Choose your account
3. **"Link to existing project?"** → N (No)
4. **"What's your project's name?"** → `chess-game` (or any name)
5. **"In which directory is your code located?"** → Press Enter (./)
6. **"Want to override the settings?"** → N (No)

Vercel will deploy your app! Wait for it to finish.

You'll see:
```
✅  Production: https://chess-game-xxx.vercel.app
```

**Copy this URL!** But don't open it yet - it won't work without environment variables.

---

## 📋 Step 3: Add Environment Variables

1. Go to: https://vercel.com/dashboard
2. Click on your `chess-game` project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left menu
5. Add these 3 variables:

### Variable 1: MONGODB_URI
- **Name**: `MONGODB_URI`
- **Value**: Your MongoDB connection string from Step 1
- **Environment**: Check all 3 boxes (Production, Preview, Development)
- Click **"Save"**

### Variable 2: JWT_SECRET
- **Name**: `JWT_SECRET`
- **Value**: `my-super-secret-jwt-key-change-this-12345`
- **Environment**: Check all 3 boxes
- Click **"Save"**

### Variable 3: NODE_ENV
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Check all 3 boxes
- Click **"Save"**

---

## 📋 Step 4: Redeploy

1. Click **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Click **"Redeploy"** again to confirm
6. Wait 1-2 minutes

---

## 🎉 Step 5: Test Your App!

1. Go to your Vercel URL: `https://chess-game-xxx.vercel.app`
2. You should see the chess game!
3. Click **"Register"**
4. Create an account
5. Test features:
   - ✅ Login/Logout
   - ✅ Play Offline (should work perfectly!)
   - ✅ Add Friends
   - ✅ Create Challenge Link
   - ✅ Check animation
   - ✅ Game over modal

---

## ⚠️ Important Notes

### WebSocket Limitations
Vercel has a 10-second timeout for serverless functions. This means:
- ✅ **Works perfectly**: Offline mode, authentication, friends
- ⚠️ **May timeout**: Long online games (>10 seconds)

### For Full Real-Time Features
Deploy backend to Railway (free):
1. Go to: https://railway.app
2. New Project → Deploy from GitHub
3. Connect your repository
4. Add same environment variables
5. Deploy
6. Update `public/app.js` line 82 to use Railway URL

---

## 🎯 Your URLs

After deployment, save these:

**Vercel URL**: https://chess-game-xxx.vercel.app
**Vercel Dashboard**: https://vercel.com/dashboard

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string has correct password
- Make sure you added `/chess-game` before the `?`

### "Environment variables not found"
- Make sure you clicked "Save" for each variable
- Redeploy after adding variables
- Check spelling is exact (case-sensitive)

### "Build failed"
- Check Vercel build logs
- Make sure all files are committed to git

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.atlas.mongodb.com
- Check VERCEL_ENV_VARS.txt for environment variable details

---

## ✅ Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string saved
- [ ] Deployed to Vercel
- [ ] Environment variables added
- [ ] Redeployed
- [ ] Tested the app
- [ ] Shared with friends!

---

**Ready? Start with Step 1! 🚀**
