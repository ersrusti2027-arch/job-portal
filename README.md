# 💼 Job Portal Backend API

A comprehensive Node.js + Express backend API for a job portal application with MongoDB integration. Built with modern best practices and fully documented API endpoints.

## 🚀 Features

- ✅ User Authentication (JWT)
- ✅ Job Posting & Management
- ✅ Job Applications Tracking
- ✅ Role-based Access Control (Candidate, Employer, Admin)
- ✅ Search & Filter Jobs
- ✅ Password Hashing with bcryptjs
- ✅ CORS Enabled
- ✅ Security Headers with Helmet
- ✅ MongoDB with Mongoose ODM
- ✅ Error Handling & Validation
- ✅ API Documentation

## 📋 Prerequisites

- **Node.js** v14 or higher
- **MongoDB** (local or cloud)
- **npm** or **yarn**
- **Docker & Docker Compose** (optional)

## 🔧 Installation

### 1. Clone the Repository
```bash
cd job-portal-backend/job-portal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/job-portal
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

### 4. Start MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running on your system
mongod
```

**Option B: Docker Compose** (Recommended)
```bash
docker-compose up -d
```

This will start:
- MongoDB on `http://localhost:27017`
- Mongo Express GUI on `http://localhost:8081`

## 🎯 Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
src/
├── config/              # Configuration files
│   └── db.js            # MongoDB connection
├── models/              # Mongoose schemas
│   ├── User.js          # User schema
│   ├── Job.js           # Job listing schema
│   └── Application.js   # Job application schema
├── controllers/         # Business logic
│   ├── userController.js
│   ├── jobController.js
│   └── applicationController.js
├── routes/              # API routes
│   ├── userRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
├── middleware/          # Express middleware
│   └── auth.js          # JWT authentication
├── utils/               # Helper functions
│   └── helpers.js
└── server.js            # Main server entry point
```

## 🔌 API Endpoints

### Authentication (Public)
```
POST   /api/users/register          Register a new user
POST   /api/users/login             Login user
```

### User Profile (Protected)
```
GET    /api/users/profile           Get user profile
PUT    /api/users/profile           Update user profile
```

### Jobs (Public)
```
GET    /api/jobs                    Get all jobs (with filters)
GET    /api/jobs/:id                Get job by ID
```

### Jobs (Protected - Employer)
```
POST   /api/jobs                    Create a new job
PUT    /api/jobs/:id                Update job
DELETE /api/jobs/:id                Delete job
GET    /api/jobs/employer/all       Get all jobs posted by employer
```

### Applications (Protected)
```
POST   /api/applications/apply/:jobId              Apply for a job
GET    /api/applications/my-applications           Get my applications
GET    /api/applications/job/:jobId                Get job applications (employer)
PUT    /api/applications/:applicationId/status     Update application status
DELETE /api/applications/:applicationId/withdraw   Withdraw application
```

## 📊 API Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "candidate"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Job (Employer)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Developer",
    "description": "Looking for experienced developer",
    "company": "Tech Company",
    "location": "New York, NY",
    "jobType": "Full-time",
    "salary": {
      "min": 80000,
      "max": 120000,
      "currency": "USD"
    },
    "skills": ["JavaScript", "MongoDB", "Node.js"]
  }'
```

### Search Jobs
```bash
curl "http://localhost:5000/api/jobs?search=developer&location=New%20York&jobType=Full-time"
```

### Apply for Job (Candidate)
```bash
curl -X POST http://localhost:5000/api/applications/apply/JOBID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resume": "URL_TO_RESUME",
    "coverLetter": "I am interested in this position..."
  }'
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

The token is returned in the login/register response and valid for 7 days by default.

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| Express.js | Web framework |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Helmet | Security headers |
| CORS | Cross-Origin support |
| Morgan | HTTP logging |
| Nodemon | Development auto-reload |

## 📝 Database Schemas

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (candidate/employer/admin),
  phone: String,
  avatar: String,
  bio: String,
  isVerified: Boolean,
  isActive: Boolean,
  timestamps: true
}
```

### Job
```javascript
{
  title: String,
  description: String,
  company: String,
  location: String,
  salary: { min, max, currency },
  jobType: String,
  experienceLevel: String,
  experience: String,
  skills: [String],
  postedBy: ObjectId (ref: User),
  applications: [ObjectId] (ref: Application),
  views: Number,
  isActive: Boolean,
  timestamps: true
}
```

### Application
```javascript
{
  jobId: ObjectId (ref: Job),
  userId: ObjectId (ref: User),
  status: String,
  resume: String,
  coverLetter: String,
  appliedAt: Date,
  timestamps: true
}
```

## 🚨 Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 🔄 Deployment

### Using Heroku
1. Install Heroku CLI
2. Create a Heroku app
3. Add MongoDB Atlas connection string to Heroku environment
4. Deploy

### Using Environment Variables
Create `.env` file in production with secure values:
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-portal
JWT_SECRET=super_secure_random_string
PORT=5000
```

## 📚 Development Tips

- Use Postman or Insomnia for API testing
- Check MongoDB with Mongo Express at `http://localhost:8081`
- Use `npm run dev` for development
- Keep `.env` file in `.gitignore` (never commit)
- Follow REST conventions for endpoints
- Always validate user input
- Hash sensitive data

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Check if MongoDB is running:
- Local: mongod process is running
- Docker: docker ps (check if container is up)
```

### JWT Token Invalid
```
Make sure:
- Token is included in Authorization header
- Token is not expired (check JWT_EXPIRE in .env)
- JWT_SECRET matches in .env
```

### Port Already in Use
```bash
# Windows: netstat -ano | findstr :5000
# Kill the process
```

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)

## 📄 License

ISC

---

**Happy Coding! 🎉**