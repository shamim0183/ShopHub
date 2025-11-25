# 🚀 Deployment Guide - ShopHub E-commerce App

This guide covers deploying your Next.js e-commerce application to production using **Vercel** (or Netlify) for the frontend and **Render.com** for the backend.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Render.com)](#backend-deployment-rendercom)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Frontend Deployment (Netlify - Alternative)](#frontend-deployment-netlify---alternative)
5. [Post-Deployment Configuration](#post-deployment-configuration)
6. [Updating Your Deployed App](#updating-your-deployed-app)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account (to connect your repository)
- ✅ MongoDB Atlas database (already set up)
- ✅ Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
- ✅ All environment variables ready (see `.env.example` files)

---

## Backend Deployment (Render.com)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up using your GitHub account
3. Authorize Render to access your repositories

### Step 2: Deploy Backend

1. **Click "New +" → "Web Service"**

2. **Connect Your Repository**
   - Select your GitHub repository
   - Render will detect it's a Node.js app

3. **Configure the Service**
   ```
   Name: shophub-backend (or your preferred name)
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Select Free Plan**
   - Choose "Free" tier (spins down after inactivity)

5. **Add Environment Variables**
   
   Click "Advanced" → "Add Environment Variable" and add:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `PORT` | `5000` |
   | `FRONTEND_URL` | Leave empty for now (add after frontend deployment) |

6. **Click "Create Web Service"**
   
   Render will start building and deploying your backend. This takes 2-5 minutes.

7. **Get Your Backend URL**
   
   Once deployed, copy your backend URL (e.g., `https://shophub-backend.onrender.com`)

### Step 3: Test Backend

Visit `https://your-backend-url.onrender.com/api/health` to verify it's working.

You should see:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-11-25T10:54:25.000Z"
}
```

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up using your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Deploy Frontend

1. **Click "Add New..." → "Project"**

2. **Import Your Repository**
   - Select your GitHub repository
   - Vercel will auto-detect it's a Next.js app

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `NEXTAUTH_SECRET` | Generate using: `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | Leave empty for now (Vercel auto-fills this) |
   | `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID |
   | `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret |
   | `NEXT_PUBLIC_API_URL` | `https://your-backend-url.onrender.com/api` |

5. **Click "Deploy"**
   
   Vercel will build and deploy your app. This takes 2-5 minutes.

6. **Get Your Frontend URL**
   
   Once deployed, copy your frontend URL (e.g., `https://shophub.vercel.app`)

### Step 3: Update Environment Variables

1. **Update NEXTAUTH_URL in Vercel**
   - Go to Project Settings → Environment Variables
   - Add `NEXTAUTH_URL` = `https://your-frontend-url.vercel.app`
   - Redeploy (Vercel → Deployments → Click ⋯ → Redeploy)

2. **Update FRONTEND_URL in Render**
   - Go to Render Dashboard → Your Backend Service
   - Environment → Add `FRONTEND_URL` = `https://your-frontend-url.vercel.app`
   - Service will auto-redeploy

3. **Update Google OAuth Redirect URIs**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to: APIs & Services → Credentials
   - Edit your OAuth 2.0 Client
   - Add to "Authorized redirect URIs":
     ```
     https://your-frontend-url.vercel.app/api/auth/callback/google
     ```
   - Save changes

---

## Frontend Deployment (Netlify - Alternative)

If you prefer Netlify over Vercel:

### Step 1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Sign up using your GitHub account

### Step 2: Deploy to Netlify

1. **Click "Add new site" → "Import an existing project"**

2. **Connect to GitHub**
   - Select your repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Add Environment Variables**
   
   Site settings → Environment variables → Add:
   
   Same variables as Vercel (see above)

5. **Deploy**
   
   Click "Deploy site"

6. **Update URLs**
   
   Follow the same steps as Vercel to update `NEXTAUTH_URL`, `FRONTEND_URL`, and Google OAuth redirect URIs.

---

## Post-Deployment Configuration

### Verify Everything Works

1. **Test Authentication**
   - Visit your deployed frontend
   - Try signing in with Google
   - Verify user session persists

2. **Test API Calls**
   - Navigate to Products page
   - Verify products load from backend
   - Try adding a new product (if authenticated)

3. **Test All Pages**
   - Home page
   - About page
   - Products listing
   - Product details
   - Add product (protected)
   - Manage products (protected)

---

## 🔄 Updating Your Deployed App

### Automatic Updates (Recommended)

Both Vercel, Netlify, and Render support **automatic deployments** from GitHub. This means:

**Every time you push code to GitHub, your app automatically redeploys!**

#### How It Works

1. **Make Changes Locally**
   ```bash
   # Edit your code
   # Test locally with npm run dev
   ```

2. **Commit and Push to GitHub**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. **Automatic Deployment**
   - **Vercel/Netlify**: Detects the push and starts building immediately
   - **Render**: Detects the push and starts building immediately
   - You'll receive email notifications when deployment completes

4. **Monitor Deployment**
   - **Vercel**: Dashboard → Deployments (see real-time logs)
   - **Netlify**: Site → Deploys (see build progress)
   - **Render**: Dashboard → Events (see deployment status)

#### Deployment Time
- **Frontend (Vercel/Netlify)**: 2-5 minutes
- **Backend (Render)**: 2-5 minutes

### Manual Updates

If you need to manually trigger a deployment:

#### Vercel
1. Go to your project dashboard
2. Click "Deployments" tab
3. Click the ⋯ menu on latest deployment
4. Click "Redeploy"

#### Netlify
1. Go to your site dashboard
2. Click "Deploys" tab
3. Click "Trigger deploy" → "Deploy site"

#### Render
1. Go to your service dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

### Updating Environment Variables

If you need to change environment variables:

#### Vercel
1. Project Settings → Environment Variables
2. Edit or add variables
3. **Important**: Redeploy after changing variables
   - Go to Deployments → Click ⋯ → Redeploy

#### Netlify
1. Site settings → Environment variables
2. Edit or add variables
3. **Important**: Trigger new deploy after changes

#### Render
1. Dashboard → Your Service → Environment
2. Edit or add variables
3. **Auto-redeploys** when you save changes

### Branch-Based Deployments

You can set up different environments:

#### Production (main branch)
```bash
git push origin main  # Deploys to production
```

#### Preview Deployments (feature branches)
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
```

- **Vercel**: Creates preview URL automatically (e.g., `shophub-git-feature-new-feature.vercel.app`)
- **Netlify**: Creates deploy preview automatically

### Rollback to Previous Version

If something goes wrong:

#### Vercel
1. Deployments tab
2. Find a working deployment
3. Click ⋯ → "Promote to Production"

#### Netlify
1. Deploys tab
2. Find a working deploy
3. Click "Publish deploy"

#### Render
1. Dashboard → Events
2. Find previous successful deploy
3. Click "Rollback to this version"

---

## Troubleshooting

### Backend Issues

#### ❌ Backend not responding
- Check Render logs: Dashboard → Logs
- Verify `MONGODB_URI` is correct
- Ensure backend service is running (free tier spins down after 15 min inactivity)

#### ❌ CORS errors
- Verify `FRONTEND_URL` in Render matches your Vercel/Netlify URL
- Check browser console for exact error

### Frontend Issues

#### ❌ API calls failing
- Verify `NEXT_PUBLIC_API_URL` points to your Render backend
- Check Network tab in browser DevTools
- Ensure backend is awake (visit health endpoint)

#### ❌ Google OAuth not working
- Verify redirect URIs in Google Console match your deployed URL
- Check `NEXTAUTH_URL` is set correctly
- Ensure `NEXTAUTH_SECRET` is set

#### ❌ Build failures
- Check Vercel/Netlify build logs
- Verify all dependencies are in `package.json`
- Ensure environment variables are set

### Database Issues

#### ❌ Cannot connect to MongoDB
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check connection string format
- Ensure database user has correct permissions

---

## 📝 Quick Reference

### Important URLs

| Service | Purpose | Example URL |
|---------|---------|-------------|
| **Render** | Backend API | `https://shophub-backend.onrender.com` |
| **Vercel** | Frontend | `https://shophub.vercel.app` |
| **MongoDB Atlas** | Database | `mongodb+srv://...` |

### Environment Variables Checklist

#### Frontend (.env.local → Vercel/Netlify)
- [ ] `MONGODB_URI`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXTAUTH_URL`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `NEXT_PUBLIC_API_URL`

#### Backend (.env → Render)
- [ ] `NODE_ENV`
- [ ] `MONGODB_URI`
- [ ] `PORT`
- [ ] `FRONTEND_URL`

---

## 🎉 Success!

Your app is now deployed and accessible worldwide! 

**Next Steps:**
- Share your app URL with others
- Monitor usage in Vercel/Netlify/Render dashboards
- Set up custom domain (optional)
- Enable analytics (optional)

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **Next.js Docs**: https://nextjs.org/docs
