# Quick MongoDB Atlas Setup (2 minutes)

## Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or email
3. Choose FREE tier (M0)

## Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "M0 FREE" tier
3. Select a region (closest to you)
4. Click "Create"

## Step 3: Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `chessuser`
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Allow Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://chessuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `mongodb+srv://chessuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/chess-game?retryWrites=true&w=majority`

## Step 6: Add to Railway
Run this command (replace with your actual connection string):
```bash
railway variables --set MONGODB_URI="mongodb+srv://chessuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/chess-game?retryWrites=true&w=majority"
```

## Step 7: Deploy
```bash
railway up
```

Done! Your chess app will now have full authentication features.
