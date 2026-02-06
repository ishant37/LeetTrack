# 🚀 Quick Start Guide

## Prerequisites Check
- ✅ Node.js installed (v16 or higher)
- ✅ MongoDB installed and running
- ✅ npm or yarn package manager

## 🎯 Quick Setup (3 steps)

### Step 1: Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Start MongoDB

Make sure MongoDB is running:

**Windows:**
```bash
# If MongoDB is installed as a service
net start MongoDB

# Or run manually
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
mongod
```

### Step 3: Run the Application

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server will start at: http://localhost:5000

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
```
Client will start at: http://localhost:5173

## 🎉 You're Ready!

1. Open your browser to http://localhost:5173
2. Register a new account
3. Search for any LeetCode username (try: "jacksmith")
4. View real-time LeetCode statistics!

## 🐛 Common Issues

### "MongoDB connection failed"
- Make sure MongoDB is running: `sudo systemctl status mongod`
- Check if port 27017 is available
- Verify MONGO_URI in server/.env file

### "Port already in use"
- Backend: Change PORT in server/.env
- Frontend: Vite will auto-assign a new port

### "Module not found"
- Run `npm install` in both client and server directories
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## 📚 Need More Help?

See the full [README.md](README.md) for detailed documentation.
