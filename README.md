# 🎯 LeetTrack - LeetCode Profile Tracker

A modern web application to search and view real-time LeetCode user statistics and profiles. Track problem-solving progress, global rankings, badges, and more!

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 🔍 **LeetCode Profile Search** - Search any LeetCode user by username
- 📊 **Real-time Statistics** - View solved problems (Easy/Medium/Hard)
- 🏆 **Rankings & Badges** - See global rankings and achievements
- 👤 **User Profiles** - Complete profile information including avatar, company, country
- 📈 **Submission Stats** - Detailed acceptance rates and submission counts
- 🎨 **Modern UI** - Clean, dark-themed interface built with Tailwind CSS

## 🚀 Tech Stack

### Frontend
- ⚛️ React 19
- 🎨 Tailwind CSS
- 🔄 React Router DOM
- 📡 Axios
- ⚡ Vite

### Backend
- 🟢 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication
- 🔑 Bcrypt for password hashing
- 📊 LeetCode Query API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/ishant37/LeetTrack.git
cd LeetTrack
```

### 2. Setup Backend

```bash
cd server
npm install

# Create .env file (use .env.example as template)
cp .env.example .env

# Edit .env and add your MongoDB URI and JWT secret
# Default MongoDB URI: mongodb://localhost:27017/leettrack
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if installed as service)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

## 🎮 Running the Application

### Start Backend Server

```bash
cd server
npm run dev
```

Server will run on: `http://localhost:5000`

### Start Frontend Development Server

```bash
cd client
npm run dev
```

Client will run on: `http://localhost:5173`

## 🔑 Environment Variables

### Server (.env)

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/leettrack

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# Server
PORT=5000

# RapidAPI (Optional)
RAPIDAPI_KEY=your_key_here
RAPIDAPI_HOST=leetcode-api.rapidapi.com
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/profile` - Get current user (Protected)

### LeetCode Data
- `GET /api/leetcode/user/:username` - Get LeetCode user statistics
- `POST /api/leetcode/sync` - Sync authenticated user's data (Protected)
- `GET /api/leetcode/top` - Get top problems (Optional)

## 📝 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Search LeetCode Users**: Enter any LeetCode username in the search bar
3. **View Statistics**: See real-time data including:
   - Global ranking
   - Problems solved (categorized by difficulty)
   - Submission statistics
   - Profile information
   - Badges and achievements
   - Skills and expertise

## 🎯 Example LeetCode Usernames to Try

- `jacksmith` (Example user)
- `leetcode` (LeetCode official account)
- Any valid LeetCode username

## 🛠️ Development

### Project Structure

```
LeetTrack/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── context/       # Auth context
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── components/        # Reusable components
│   │   └── Navbar.jsx
│   └── services/          # API services
│       └── api.js
├── server/                # Backend Express app
│   ├── config/           # Database config
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── index.js          # Entry point
└── README.md
```

### Available Scripts

#### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

#### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
```

## 🔒 Security

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens for secure authentication
- Protected routes require valid tokens
- Environment variables for sensitive data

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check MongoDB URI in `.env` file
- Verify MongoDB port (default: 27017)

### API Errors
- Check if backend server is running on port 5000
- Verify `.env` file exists with correct values
- Check browser console for detailed error messages

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be v16+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Author

**Ishant Chauhan**
- GitHub: [@ishant37](https://github.com/ishant37)

## 🙏 Acknowledgments

- LeetCode for the amazing platform
- [leetcode-query](https://www.npmjs.com/package/leetcode-query) npm package
- React and Tailwind CSS communities

---

Made with ❤️ by Ishant Chauhan
