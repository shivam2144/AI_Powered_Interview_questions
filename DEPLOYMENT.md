# Deployment Guide - Render

This guide will help you deploy the Interview Question Platform to Render.

## Prerequisites

1. Create a free account at [Render.com](https://render.com)
2. Push your code to GitHub (or GitLab/Bitbucket)
3. Have your environment variables ready:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Your JWT secret key
   - `GEMINI_API_KEY` - Your Google Gemini API key

## Deployment Steps

### Option 1: Deploy Using render.yaml (Recommended)

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Create New Blueprint on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **New** → **Blueprint**
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and create both services

3. **Set Environment Variables**
   
   For **interview-platform-api** (Backend):
   - `MONGODB_URI` = `mongodb+srv://shivamdalve123_db_user:vcVAr3iiWPjXAQlo@cluster0.tzmxfvp.mongodb.net/interview_platform`
   - `JWT_SECRET` = `U2VjcmV0U3RyaW5nS2V5QW5kUmFuZG9tVmFsdWVXaXRoU3ltYm9sc0FuZENoYXJz`
   - `GEMINI_API_KEY` = `AIzaSyDzfWBSXh72cJjPJxc5ygM-UqNVuxAq-AM`
   - `NODE_ENV` = `production`
   
   For **interview-platform-client** (Frontend):
   - `REACT_APP_API_URL` = `https://interview-platform-api.onrender.com` (use your actual backend URL)

4. **Deploy**
   - Render will automatically build and deploy both services
   - Wait for builds to complete (first build takes 5-10 minutes)

### Option 2: Manual Deployment

#### Deploy Backend (Web Service)

1. **Create New Web Service**
   - Go to Render Dashboard
   - Click **New** → **Web Service**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `interview-platform-api`
     - **Region**: Oregon (US West)
     - **Branch**: `main`
     - **Root Directory**: Leave empty
     - **Environment**: `Node`
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && npm start`
     - **Plan**: Free

2. **Add Environment Variables** (same as above)

3. **Deploy** - Click "Create Web Service"

#### Deploy Frontend (Static Site)

1. **Create New Static Site**
   - Click **New** → **Static Site**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `interview-platform-client`
     - **Branch**: `main`
     - **Build Command**: `cd client && npm install && npm run build`
     - **Publish Directory**: `client/build`
     - **Plan**: Free

2. **Add Environment Variable**
   - `REACT_APP_API_URL` = Your backend URL

3. **Deploy** - Click "Create Static Site"

## Update API URL in Frontend

Before deploying, update the API URL configuration:

1. Create `client/.env.production`:
   ```env
   REACT_APP_API_URL=https://YOUR_BACKEND_URL.onrender.com
   ```

2. Update `client/src/services/api.js` to use environment variable:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
   ```

## Post-Deployment

1. **Enable CORS**: Backend already configured with CORS
2. **Test Health Check**: Visit `https://YOUR_BACKEND_URL.onrender.com/api/health`
3. **Access Application**: Visit your frontend URL

## MongoDB Atlas Configuration

Ensure MongoDB Atlas allows connections from anywhere:
1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

## Important Notes

- **Free Tier Limitations**:
  - Services spin down after 15 minutes of inactivity
  - First request after spin-down takes 30-60 seconds
  - 750 hours/month free (sufficient for one service 24/7)

- **Cold Starts**: Free tier services sleep after inactivity. First request will be slow.

- **Auto-Deploy**: Render automatically redeploys when you push to GitHub

- **Custom Domains**: Available on paid plans

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### API Connection Issues
- Verify `REACT_APP_API_URL` matches backend URL
- Check CORS configuration in backend
- Ensure environment variables are set correctly

### MongoDB Connection Fails
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string format
- Ensure database user has correct permissions

## Monitoring

- **Logs**: Available in Render dashboard for each service
- **Metrics**: View CPU, memory usage in dashboard
- **Health Checks**: Automatic for web services

## Useful Commands

```bash
# View backend logs
# Go to Render Dashboard → interview-platform-api → Logs

# Manually trigger deploy
# Dashboard → Service → Manual Deploy → Deploy latest commit

# Suspend service
# Dashboard → Service → Settings → Suspend Service
```

## Support

For issues:
- Check [Render Documentation](https://render.com/docs)
- Review deployment logs
- Verify environment variables
- Test locally first

## Live URLs

After deployment:
- **Backend API**: `https://interview-platform-api.onrender.com`
- **Frontend**: `https://interview-platform-client.onrender.com`
- **Health Check**: `https://interview-platform-api.onrender.com/api/health`

Replace with your actual Render URLs.
