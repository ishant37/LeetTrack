# LeetTrack Server API

Backend server for LeetTrack application with user authentication and LeetCode integration.

## Features

- User authentication (Register/Login) with JWT
- LeetCode username linking
- Fetch LeetCode user statistics and profile
- Auto-sync LeetCode data
- MongoDB database integration

## Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Install MongoDB**
   - Install MongoDB locally or use MongoDB Atlas (cloud)
   - For local: [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)

3. **Configure Environment Variables**
   - Update `.env` file with your configurations:
   ```env
   MONGO_URI=mongodb://localhost:27017/leettrack
   JWT_SECRET=your_secure_random_string
   RAPIDAPI_KEY=your_rapidapi_key
   RAPIDAPI_HOST=leetcode-compensation.p.rapidapi.com
   PORT=5000
   ```

4. **Start the Server**
```bash
npm run dev
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "leetcodeUsername": "johndoe" // optional
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "leetcodeUsername": "johndoe",
  "token": "jwt_token"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "leetcodeUsername": "johndoe",
  "leetcodeData": { ... },
  "token": "jwt_token"
}
```

#### Get User Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Update LeetCode Username (Protected)
```http
PUT /api/auth/leetcode-username
Authorization: Bearer <token>
Content-Type: application/json

{
  "leetcodeUsername": "newusername"
}
```

### LeetCode Routes (`/api/leetcode`)

#### Get LeetCode User Stats (Public)
```http
GET /api/leetcode/user/:username
```

**Response:**
```json
{
  "username": "johndoe",
  "profile": {
    "realName": "John Doe",
    "userAvatar": "avatar_url",
    "ranking": 12345,
    "reputation": 100
  },
  "solvedProblems": {
    "easy": 150,
    "medium": 100,
    "hard": 20,
    "total": 270
  },
  "submitStats": { ... },
  "badges": [ ... ]
}
```

#### Sync LeetCode Data (Protected)
```http
POST /api/leetcode/sync
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "LeetCode data synced successfully",
  "leetcodeData": { ... }
}
```

#### Get Top Problems
```http
GET /api/leetcode/top
```

#### Get Post by ID
```http
GET /api/leetcode/post/:postId
```

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  leetcodeUsername: String,
  leetcodeData: {
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
    lastSynced: Date
  },
  timestamps: true
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/leettrack` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_random_secret_string` |
| `RAPIDAPI_KEY` | RapidAPI key for LeetCode API | `your_api_key` |
| `RAPIDAPI_HOST` | RapidAPI host | `leetcode-compensation.p.rapidapi.com` |
| `PORT` | Server port | `5000` |

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **leetcode-query** - LeetCode GraphQL API wrapper
- **axios** - HTTP client
- **cors** - CORS middleware
- **dotenv** - Environment variables

## Usage Flow

1. User registers with email, password, and optional LeetCode username
2. User logs in and receives a JWT token
3. User can update their LeetCode username anytime
4. User can sync their LeetCode data (fetches latest stats)
5. Frontend can display user's LeetCode progress and statistics

## Notes

- JWT tokens expire in 30 days
- Passwords are hashed using bcrypt before storing
- LeetCode data is cached in the database and synced on demand
- All protected routes require `Authorization: Bearer <token>` header
