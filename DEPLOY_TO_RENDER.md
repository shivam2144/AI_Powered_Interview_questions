# 🚀 Render Deployment Guide
## AI Powered Interview Questions Platform

Your code is now on GitHub: https://github.com/shivam2144/AI_Powered_Interview_questions

---

## 📋 Pre-Deployment Checklist

✅ Code pushed to GitHub
✅ MongoDB Atlas database ready
✅ Gemini API key available
✅ Render account created (https://render.com)

---

## 🎯 Step-by-Step Deployment

### **STEP 1: Deploy Backend (API Server)**

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click **"New +"** button (top right)
   - Select **"Web Service"**

2. **Connect GitHub Repository**
   - Click **"Connect account"** if not connected
   - Find and select: `AI_Powered_Interview_questions`
   - Click **"Connect"**

3. **Configure Backend Service**
   Fill in the following settings:

   **Name:** `interview-platform-api`
   
   **Region:** `Oregon (US West)` *(Free tier available)*
   
   **Branch:** `main`
   
   **Root Directory:** *(leave empty)*
   
   **Environment:** `Node`
   
   **Build Command:**
   ```
   cd server && npm install
   ```
   
   **Start Command:**
   ```
   cd server && npm start
   ```
   
   **Instance Type:** `Free`

4. **Add Environment Variables**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add these variables one by one:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | `mongodb+srv://shivamdalve123_db_user:vcVAr3iiWPjXAQlo@cluster0.tzmxfvp.mongodb.net/interview_platform` |
   | `JWT_SECRET` | `U2VjcmV0U3RyaW5nS2V5QW5kUmFuZG9tVmFsdWVXaXRoU3ltYm9sc0FuZENoYXJz` |
   | `GEMINI_API_KEY` | `AIzaSyDzfWBSXh72cJjPJxc5ygM-UqNVuxAq-AM` |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `CLIENT_URL` | `*` *(will update later)* |

5. **Deploy Backend**
   - Click **"Create Web Service"**
   - Wait for deployment (5-10 minutes)
   - **Copy your backend URL** (e.g., `https://interview-platform-api.onrender.com`)

6. **Test Backend**
   - Visit: `https://YOUR-BACKEND-URL.onrender.com/api/health`
   - Should see: `{"status":"ok","message":"Server is running"}`

---

### **STEP 2: Deploy Frontend (React App)**

1. **Create New Static Site**
   - Go back to Render Dashboard
   - Click **"New +"** → **"Static Site"**
   - Select **"Connect a repository"**
   - Choose: `AI_Powered_Interview_questions`

2. **Configure Frontend Service**
   
   **Name:** `interview-platform-client`
   
   **Branch:** `main`
   
   **Root Directory:** *(leave empty)*
   
   **Build Command:**
   ```
   cd client && npm install && npm run build
   ```
   
   **Publish Directory:**
   ```
   client/build
   ```
   
   **Instance Type:** `Free`

3. **Add Environment Variable**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   | Key | Value |
   |-----|-------|
   | `REACT_APP_API_URL` | `https://YOUR-BACKEND-URL.onrender.com/api` |
   
   ⚠️ **Important:** Replace `YOUR-BACKEND-URL` with the actual URL from Step 1

4. **Deploy Frontend**
   - Click **"Create Static Site"**
   - Wait for deployment (5-10 minutes)
   - **Copy your frontend URL** (e.g., `https://interview-platform-client.onrender.com`)

---

### **STEP 3: Update Backend CORS**

1. **Go to Backend Service Settings**
   - In Render Dashboard, click on `interview-platform-api`
   - Go to **"Environment"** tab
   
2. **Update CLIENT_URL**
   - Find `CLIENT_URL` variable
   - Change from `*` to your frontend URL: `https://interview-platform-client.onrender.com`
   - Click **"Save Changes"**
   - Service will automatically redeploy

---

### **STEP 4: Configure MongoDB Atlas**

1. **Allow Render IP Addresses**
   - Go to https://cloud.mongodb.com
   - Click **"Network Access"** (left sidebar)
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**
   
   ⚠️ This allows Render servers to connect to your database

---

### **STEP 5: Test Your Application**

1. **Visit Frontend URL**
   - Open: `https://interview-platform-client.onrender.com`

2. **Test Features:**
   - ✅ Register new account
   - ✅ Login
   - ✅ Navigate to Dashboard
   - ✅ Select topic and difficulty
   - ✅ Generate questions
   - ✅ Try voice recognition (Chrome browser)
   - ✅ Submit answers
   - ✅ Check progress page

---

## 🎉 Deployment Complete!

### Your Live URLs:
- **Frontend:** https://interview-platform-client.onrender.com
- **Backend API:** https://interview-platform-api.onrender.com/api
- **Health Check:** https://interview-platform-api.onrender.com/api/health

---

## ⚠️ Important Free Tier Information

### Services Sleep After 15 Minutes
- Render free tier spins down services after 15 minutes of inactivity
- **First request takes 30-60 seconds** (cold start)
- This is normal behavior for free tier
- Service automatically wakes up when accessed

### Tips for Free Tier:
- Be patient on first load after inactivity
- Use Chrome browser for best Web Speech API support
- Consider upgrading to paid plan for 24/7 uptime

---

## 🔄 Auto-Deploy Setup

### Automatic Deployment on Git Push:
```powershell
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main
```

✅ Render automatically detects the push and redeploys both services!

---

## 📊 Monitoring Your Services

### View Logs:
1. Go to Render Dashboard
2. Click on service name
3. Click **"Logs"** tab
4. See real-time logs

### Check Status:
- Dashboard shows: **"Live"** (running) or **"Deploying"** (updating)
- Green dot = service is healthy
- Yellow/Red = issues detected

### Manual Deploy:
1. Go to service dashboard
2. Click **"Manual Deploy"**
3. Select **"Deploy latest commit"**

---

## 🔧 Troubleshooting

### ❌ Backend Build Fails
**Check:**
- Build logs in Render dashboard
- All environment variables are set correctly
- `package.json` has all dependencies

**Fix:**
```
Verify server/package.json
Check MongoDB connection string
Ensure GEMINI_API_KEY is valid
```

### ❌ Frontend Build Fails
**Check:**
- `REACT_APP_API_URL` is set correctly
- Build command is: `cd client && npm install && npm run build`
- Publish directory is: `client/build`

### ❌ API Connection Errors
**Check:**
1. Frontend environment variable points to correct backend URL
2. Backend `CLIENT_URL` allows your frontend domain
3. Both services are "Live" in dashboard

**Test:**
```
Visit: https://YOUR-BACKEND-URL.onrender.com/api/health
Should return: {"status":"ok","message":"Server is running"}
```

### ❌ MongoDB Connection Fails
**Check:**
1. MongoDB Atlas → Network Access → 0.0.0.0/0 is allowed
2. Connection string includes database name
3. Database user has correct permissions

**Test Locally:**
```powershell
cd server
node test-gemini.js
```

### ❌ 500 Internal Server Error
**Steps:**
1. Check backend logs in Render
2. Look for MongoDB connection errors
3. Verify all environment variables
4. Check Gemini API key is valid

### ❌ Voice Recognition Not Working
**Solution:**
- Use Chrome browser (best support)
- Allow microphone permissions
- HTTPS required (Render provides this automatically)

---

## 📈 Upgrade Options

### If You Need:
- **No cold starts** → Upgrade to Starter plan ($7/month per service)
- **Custom domain** → Available on paid plans
- **More compute** → Scale instance type
- **Background workers** → Add background worker service

---

## 🔐 Security Best Practices

### ✅ Already Implemented:
- Environment variables for secrets
- JWT authentication
- CORS configuration
- HTTPS by default on Render

### ⚠️ Before Production:
1. Change JWT_SECRET to a new random value
2. Consider rate limiting
3. Add input validation
4. Enable MongoDB encryption at rest
5. Set up error monitoring (Sentry, LogRocket)

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Your Dashboard:** https://dashboard.render.com
- **GitHub Repo:** https://github.com/shivam2144/AI_Powered_Interview_questions

---

## 🎓 Next Steps

1. **Share your app** with friends and get feedback
2. **Monitor usage** in Render dashboard
3. **Add features** and push to GitHub (auto-deploys!)
4. **Upgrade** when ready for production traffic

---

**🎉 Congratulations! Your AI Interview Platform is Live! 🎉**

---

*Generated on December 5, 2025*
