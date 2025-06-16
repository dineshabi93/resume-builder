# Deployment Guide - Resume Builder SaaS

This guide provides step-by-step instructions for deploying the Resume Builder SaaS application to production.

## 🌐 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Vercel)      │◄──►│   (Render)      │◄──►│ (MongoDB Atlas) │
│   React App     │    │   Express API   │    │   Cloud DB      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Repository**: Code pushed to GitHub
2. **MongoDB Atlas Account**: For database hosting
3. **Razorpay Account**: For payment processing
4. **Vercel Account**: For frontend hosting
5. **Render Account**: For backend hosting

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up or log in to your account
3. Click "Create a New Cluster"
4. Choose the free tier (M0 Sandbox)
5. Select your preferred cloud provider and region
6. Click "Create Cluster"

### Step 2: Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password
4. Set privileges to "Read and write to any database"
5. Click "Add User"

### Step 3: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with your database name (e.g., `resumebuilder`)

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resumebuilder?retryWrites=true&w=majority
```

## 💳 Razorpay Setup

### Step 1: Create Razorpay Account

1. Go to [Razorpay](https://razorpay.com/)
2. Sign up for a business account
3. Complete KYC verification
4. Activate your account

### Step 2: Get API Keys

1. Go to Razorpay Dashboard
2. Navigate to "Settings" → "API Keys"
3. Generate API keys for live mode
4. Note down:
   - Key ID (starts with `rzp_live_`)
   - Key Secret

### Step 3: Configure Webhooks

1. Go to "Settings" → "Webhooks"
2. Create a new webhook
3. Set URL to: `https://your-backend-url.onrender.com/api/payments/webhook`
4. Select events: `payment.captured`, `payment.failed`
5. Note down the webhook secret

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. Ensure your `package.json` has the correct start script:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

2. Verify `render.yaml` configuration exists in backend folder

### Step 2: Deploy to Render

1. Go to [Render](https://render.com/)
2. Sign up/login and connect your GitHub account
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure the service:
   - **Name**: `resume-builder-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

### Step 3: Configure Environment Variables

In Render dashboard, add these environment variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resumebuilder?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note down your backend URL (e.g., `https://resume-builder-backend.onrender.com`)

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Deployment

1. Update `vercel.json` with correct environment variables
2. Ensure build process works locally:
```bash
cd frontend
npm run build
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up/login and connect your GitHub account
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

```env
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your app will be available at `https://your-app-name.vercel.app`

## 🔧 Post-Deployment Configuration

### Step 1: Update CORS Settings

Update your backend CORS configuration to include your frontend domain:

```javascript
// In backend/index.js
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app-name.vercel.app'
  ],
  credentials: true
}));
```

### Step 2: Test Payment Integration

1. Create a test account on your deployed app
2. Try upgrading to premium
3. Use Razorpay test cards to verify payment flow
4. Check webhook delivery in Razorpay dashboard

### Step 3: Configure Custom Domain (Optional)

#### For Vercel (Frontend):
1. Go to your project settings
2. Add your custom domain
3. Configure DNS records as instructed

#### For Render (Backend):
1. Go to your service settings
2. Add custom domain
3. Configure DNS records as instructed

## 🔍 Monitoring & Maintenance

### Health Checks

Set up monitoring for:
- Frontend availability
- Backend API health
- Database connectivity
- Payment processing

### Logging

Monitor logs in:
- Vercel dashboard for frontend issues
- Render dashboard for backend logs
- MongoDB Atlas for database metrics

### Backup Strategy

1. **Database**: MongoDB Atlas provides automatic backups
2. **Code**: Ensure regular commits to GitHub
3. **Environment Variables**: Keep secure backup of all keys

## 🚨 Troubleshooting

### Common Issues

#### Frontend Build Fails
```bash
# Check for dependency issues
npm install
npm run build

# Clear cache if needed
rm -rf node_modules package-lock.json
npm install
```

#### Backend Deployment Fails
- Check environment variables are set correctly
- Verify MongoDB connection string
- Ensure all dependencies are in package.json

#### Payment Integration Issues
- Verify Razorpay keys are correct
- Check webhook URL is accessible
- Ensure CORS allows your frontend domain

#### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

### Performance Optimization

1. **Frontend**:
   - Enable Vercel analytics
   - Optimize images and assets
   - Implement code splitting

2. **Backend**:
   - Monitor response times
   - Implement caching where appropriate
   - Optimize database queries

3. **Database**:
   - Create appropriate indexes
   - Monitor query performance
   - Set up connection pooling

## 📊 Production Checklist

Before going live, ensure:

- [ ] All environment variables are set correctly
- [ ] Database is properly configured and accessible
- [ ] Payment integration is tested with real transactions
- [ ] CORS is configured for production domains
- [ ] SSL certificates are properly configured
- [ ] Error monitoring is set up
- [ ] Backup strategy is in place
- [ ] Performance monitoring is configured
- [ ] Security headers are implemented
- [ ] Rate limiting is configured (if needed)

## 🔐 Security Considerations

### Production Security

1. **Environment Variables**: Never commit secrets to version control
2. **HTTPS**: Ensure all communications use HTTPS
3. **CORS**: Restrict origins to your actual domains
4. **Rate Limiting**: Implement to prevent abuse
5. **Input Validation**: Validate all user inputs
6. **Database Security**: Use strong passwords and restrict access

### Monitoring

Set up alerts for:
- Unusual payment activity
- Failed authentication attempts
- Server errors and downtime
- Database connection issues

## 📞 Support

If you encounter issues during deployment:

1. Check the troubleshooting section above
2. Review service logs in respective dashboards
3. Verify all configuration steps were followed
4. Contact platform support if needed:
   - Vercel Support
   - Render Support
   - MongoDB Atlas Support
   - Razorpay Support

---

**Deployment completed successfully! 🎉**

Your Resume Builder SaaS is now live and ready to help users create professional resumes.

