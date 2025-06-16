# Resume Builder SaaS - Complete Production-Ready Application

A full-stack Resume Builder SaaS application built with React.js, Node.js, Express, MongoDB, and Razorpay payment integration.

## 🚀 Features

### Core Features
- **User Authentication**: Secure email/password registration and login with JWT
- **Resume Builder**: Interactive form with live preview
- **Multiple Templates**: 4 professional resume templates (1 free, 3 premium)
- **PDF Export**: Download resumes as high-quality PDF files
- **Shareable Links**: Create public links to share resumes online
- **Payment Integration**: Razorpay integration for premium features

### Premium Features (₹499 lifetime)
- Access to all premium templates
- Unlimited resume creation
- Priority support
- Custom branding options
- Advanced analytics

## 🛠 Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **html2pdf.js** for PDF generation
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Razorpay** for payment processing
- **CORS** enabled for cross-origin requests

### Deployment
- **Frontend**: Vercel (configured)
- **Backend**: Render (configured)
- **Database**: MongoDB Atlas (recommended)

## 📁 Project Structure

```
resume-builder-saas/
├── frontend/                 # React.js frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── templates/   # Resume templates
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ResumeForm.jsx
│   │   │   ├── ResumePreview.jsx
│   │   │   └── TemplateSelector.jsx
│   │   ├── context/         # React context providers
│   │   │   └── AuthContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ResumeBuilder.jsx
│   │   │   └── UpgradePage.jsx
│   │   ├── utils/           # Utility functions
│   │   │   ├── api.js
│   │   │   └── axios.js
│   │   ├── App.jsx          # Main app component
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # App entry point
│   ├── .env.example         # Environment variables template
│   ├── package.json         # Dependencies and scripts
│   ├── tailwind.config.cjs  # Tailwind CSS configuration
│   ├── postcss.config.cjs   # PostCSS configuration
│   └── vercel.json          # Vercel deployment config
│
├── backend/                 # Node.js/Express backend
│   ├── models/              # MongoDB models
│   │   ├── User.js          # User model with auth & payment info
│   │   └── Resume.js        # Resume model with full data structure
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── resumes.js       # Resume CRUD operations
│   │   └── payments.js      # Razorpay payment handling
│   ├── middleware/          # Express middleware
│   │   └── auth.js          # JWT authentication middleware
│   ├── .env.example         # Environment variables template
│   ├── package.json         # Dependencies and scripts
│   ├── index.js             # Server entry point
│   └── render.yaml          # Render deployment config
│
├── README.md                # This file
├── DEPLOYMENT.md            # Deployment instructions
├── TESTING_RESULTS.md       # Testing documentation
└── todo.md                  # Development progress tracker
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Razorpay account for payments

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd resume-builder-saas

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

#### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 3. Run Development Servers

#### Backend
```bash
cd backend
npm run dev
```

#### Frontend
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🎨 Resume Templates

### 1. Basic Template (Free)
- Clean and simple design
- Perfect for any industry
- Traditional layout with clear sections

### 2. Modern Template (Premium)
- Contemporary design with gradient header
- Timeline-style experience section
- Two-column layout with progress bars

### 3. Creative Template (Premium)
- Colorful sidebar design
- Perfect for creative professionals
- Artistic elements and modern typography

### 4. Professional Template (Premium)
- Formal and elegant design
- Executive-level presentation
- Serif typography with structured layout

## 💳 Payment Integration

### Razorpay Setup
1. Create a Razorpay account
2. Get API keys from the dashboard
3. Configure webhook endpoints
4. Set up payment verification

### Payment Flow
1. User selects premium plan (₹499 lifetime)
2. Razorpay checkout opens
3. Payment verification on backend
4. User account upgraded to premium
5. Access to all premium templates unlocked

## 🔐 Authentication & Security

### Features
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes for authenticated users
- Password strength validation
- Remember me functionality

### Security Measures
- CORS configuration
- Input validation and sanitization
- Secure HTTP headers
- Environment variable protection
- Database connection security

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Backend (Render)
1. Connect your GitHub repository to Render
2. Configure environment variables
3. Deploy as a web service

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Configure network access
3. Get connection string for MONGO_URI

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Resumes
- `GET /api/resumes` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - Handle webhooks

## 🧪 Testing

### Frontend Testing
- ✅ Landing page loads correctly
- ✅ Authentication forms work
- ✅ Navigation functions properly
- ✅ Responsive design verified
- ✅ Build process successful

### Backend Testing
- ✅ API routes configured
- ✅ Database models defined
- ✅ Authentication middleware ready
- ✅ Payment integration setup

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Backend
```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions:
- Email: support@resumebuilder.com
- Documentation: See DEPLOYMENT.md for detailed setup
- Issues: Create a GitHub issue

## 🎯 Future Enhancements

- Additional resume templates
- AI-powered content suggestions
- Integration with job boards
- Team collaboration features
- Advanced analytics dashboard
- Mobile app development

---

**Built with ❤️ for job seekers worldwide**

