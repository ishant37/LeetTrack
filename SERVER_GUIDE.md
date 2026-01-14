# LeetTrack Server - Complete Structure

## 📁 File Structure
```
server/
├── config/
│   └── db.js                      # MongoDB connection
├── controllers/
│   ├── authController.js          # Authentication logic
│   └── leetcodeController.js      # LeetCode API integration
├── middleware/
│   └── authMiddleware.js          # JWT verification
├── models/
│   └── User.js                    # User schema
├── routes/
│   ├── authRoutes.js              # Auth endpoints
│   └── leetcodeRoutes.js          # LeetCode endpoints
├── .env                           # Environment variables
├── index.js                       # Server entry point
├── package.json                   # Dependencies
└── README.md                      # Documentation
```

## 🔐 Authentication System

### User Registration Flow
1. User submits name, email, password, and LeetCode username (optional)
2. Server validates input and checks for existing user
3. Password is hashed with bcryptjs
4. User is created in MongoDB
5. JWT token is generated and returned

### User Login Flow
1. User submits email and password
2. Server finds user and compares password
3. JWT token is generated
4. User data including LeetCode info is returned

## 📊 LeetCode Integration

### Features
- **User Stats Fetching**: Get any LeetCode user's profile and stats
- **Data Syncing**: Authenticated users can sync their LeetCode data
- **Automatic Caching**: LeetCode data is stored in MongoDB for quick access
- **Problem Tracking**: Track solved problems by difficulty (Easy/Medium/Hard)

### LeetCode Data Structure
```javascript
{
  profile: {
    ranking: Number,
    reputation: Number,
    avatar: String
  },
  solvedProblems: {
    easy: Number,
    medium: Number,
    hard: Number,
    total: Number
  },
  submitStats: {
    acSubmissionNum: Array,
    totalSubmissionNum: Array
  },
  lastSynced: Date
}
```

## 🛣️ API Routes

### Public Routes
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/leetcode/user/:username` - Get LeetCode user stats
- `GET /api/leetcode/top` - Get top problems
- `GET /api/leetcode/post/:postId` - Get post by ID

### Protected Routes (Require JWT Token)
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/leetcode-username` - Update LeetCode username
- `POST /api/leetcode/sync` - Sync LeetCode data

## 🔧 Configuration

### Required Environment Variables
```env
MONGO_URI=mongodb://localhost:27017/leettrack
JWT_SECRET=your_secure_random_string
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=leetcode-compensation.p.rapidapi.com
PORT=5000
```

## 🚀 Getting Started

1. **Install MongoDB**
   ```bash
   # Windows (using Chocolatey)
   choco install mongodb
   
   # Or download from: https://www.mongodb.com/try/download/community
   ```

2. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Start MongoDB**
   ```bash
   # Start MongoDB service
   net start MongoDB
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📦 Installed Packages

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^8.10.1 | MongoDB ODM |
| bcryptjs | ^2.4.3 | Password hashing |
| jsonwebtoken | ^9.0.2 | JWT authentication |
| leetcode-query | ^2.0.1 | LeetCode API wrapper |
| axios | ^1.13.2 | HTTP requests |
| cors | ^2.8.5 | CORS handling |
| dotenv | ^17.2.3 | Environment variables |
| nodemon | ^3.1.11 | Dev auto-reload |

## 🎯 Usage Example

### Frontend Integration

```javascript
// Register user
const register = async (userData) => {
  const response = await axios.post('http://localhost:5000/api/auth/register', {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    leetcodeUsername: userData.leetcodeUsername
  });
  
  // Save token to localStorage
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Login user
const login = async (credentials) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Sync LeetCode data
const syncLeetCode = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:5000/api/leetcode/sync',
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

// Get user profile
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    'http://localhost:5000/api/auth/profile',
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};
```

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication
- Protected routes with middleware
- Token expiration (30 days)
- Input validation
- Error handling

## 📈 Next Steps

1. Add email verification
2. Implement password reset
3. Add rate limiting
4. Add request validation middleware
5. Implement refresh tokens
6. Add user profile pictures
7. Track daily progress
8. Add problem recommendations
9. Create achievement system
10. Add friend/social features
