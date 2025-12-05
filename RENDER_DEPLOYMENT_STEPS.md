# 🚀 Quick Deployment Steps for Render

## Step 1: Prepare Your Code for Git

Open PowerShell in your project directory and run:

```powershell
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Interview Question Platform"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (name: `interview-question-platform`)
3. Don't initialize with README (we already have one)
4. Copy the repository URL

## Step 3: Push to GitHub

```powershell
# Add remote
git remote add origin YOUR_GITHUB_REPO_URL

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Deploy Backend on Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +" → "Web Service"**
3. **Connect GitHub Repository**
4. **Configure Backend Service**:
   - **Name**: `interview-platform-api`
   - **Region**: Oregon (US West) - Free tier
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Instance Type**: Free

5. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   MONGODB_URI = mongodb+srv://shivamdalve123_db_user:vcVAr3iiWPjXAQlo@cluster0.tzmxfvp.mongodb.net/interview_platform
   
   JWT_SECRET = U2VjcmV0U3RyaW5nS2V5QW5kUmFuZG9tVmFsdWVXaXRoU3ltYm9sc0FuZENoYXJz
   
   GEMINI_API_KEY = AIzaSyDzfWBSXh72cJjPJxc5ygM-UqNVuxAq-AM
   
   NODE_ENV = production
   
   PORT = 5000
   
   CLIENT_URL = https://interview-platform-client.onrender.com
   ```
   (Update CLIENT_URL after creating frontend)

6. **Click "Create Web Service"**
7. **Wait for deployment** (5-10 minutes for first build)
8. **Copy your backend URL**: `https://interview-platform-api.onrender.com`

## Step 5: Test Backend

Visit: `https://YOUR_BACKEND_URL.onrender.com/api/health`

Should return: `{"status":"ok","message":"Server is running"}`

## Step 6: Deploy Frontend on Render

1. **Go back to Render Dashboard**
2. **Click "New +" → "Static Site"**
3. **Select same GitHub repository**
4. **Configure Frontend**:
   - **Name**: `interview-platform-client`
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`

5. **Add Environment Variable**:
   ```
   REACT_APP_API_URL = https://interview-platform-api.onrender.com/api
   ```
   (Use your actual backend URL from Step 4)

6. **Click "Create Static Site"**
7. **Wait for deployment** (5-10 minutes)
8. **Copy your frontend URL**: `https://interview-platform-client.onrender.com`

## Step 7: Update Backend CLIENT_URL

1. Go back to your **backend service** settings
2. Find `CLIENT_URL` environment variable
3. Update it with your **frontend URL**: `https://interview-platform-client.onrender.com`
4. Click "Save Changes"
5. Backend will automatically redeploy

## Step 8: Configure MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

## Step 9: Test Your Application

1. Visit your frontend URL: `https://interview-platform-client.onrender.com`
2. Register a new account
3. Login
4. Try generating questions
5. Test voice recognition (Chrome browser recommended)

## 🎉 Deployment Complete!

Your application is now live at:
- **Frontend**: https://interview-platform-client.onrender.com
- **Backend API**: https://interview-platform-api.onrender.com
- **Health Check**: https://interview-platform-api.onrender.com/api/health

## 📝 Important Notes

### Free Tier Limitations:
- Services **sleep after 15 minutes** of inactivity
- **First request** after sleep takes 30-60 seconds (cold start)
- This is normal for free tier

### Auto-Deploy:
- Push to GitHub main branch = automatic redeploy
- Check logs in Render dashboard for errors

### Monitoring:
- **View Logs**: Dashboard → Service → Logs
- **Check Status**: Dashboard → Service (shows running/deploying status)
- **Restart Service**: Dashboard → Service → Manual Deploy

## 🔧 Troubleshooting

### Build Fails:
```
Check Render logs → Look for npm install errors
Ensure package.json dependencies are correct
```

### API Connection Issues:
```
Verify REACT_APP_API_URL matches backend URL
Check CORS settings in server.js
Ensure environment variables are set
```

### MongoDB Connection Fails:
```
Verify IP whitelist includes 0.0.0.0/0
Check MONGODB_URI format
Test connection string locally
```

### 500 Internal Server Error:
```
Check backend logs in Render dashboard
Verify all environment variables are set
Check MongoDB connection
```

## 🔄 Updating Your App

To push updates:

```powershell
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

Render will automatically detect the push and redeploy both services.

## 💡 Tips

1. **Always test locally first** before pushing to GitHub
2. **Use Render logs** to debug deployment issues
3. **Keep secrets secure** - use environment variables
4. **Monitor cold starts** - first request after sleep is slow
5. **Upgrade to paid plan** if you need 24/7 uptime

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Your Dashboard**: https://dashboard.render.com

---

**Happy Deploying! 🚀**
