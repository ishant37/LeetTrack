# MongoDB Setup Guide for LeetTrack

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

### Steps:
1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region (choose closest to you)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `leettrack`
   - Password: Generate a secure password (save it!)
   - User Privileges: "Atlas Admin"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://leettrack:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update .env File**
   ```env
   MONGO_URI=mongodb+srv://leettrack:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/leettrack?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Replace `cluster0.xxxxx` with your cluster address
   - Add `/leettrack` before the `?` to specify database name

---

## Option 2: Local MongoDB Installation (Windows)

### Method A: Using Installer

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Select:
     - Version: Latest (7.0 or newer)
     - Platform: Windows
     - Package: MSI
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Select "Install MongoDB as a Service"
   - Keep "Run service as Network Service user"
   - Click "Install"

3. **Verify Installation**
   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service**
   ```powershell
   net start MongoDB
   ```

5. **Update .env File**
   ```env
   MONGO_URI=mongodb://localhost:27017/leettrack
   ```

### Method B: Using Chocolatey

1. **Install Chocolatey** (if not installed)
   - Open PowerShell as Administrator
   - Run:
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

2. **Install MongoDB**
   ```powershell
   choco install mongodb
   ```

3. **Create Data Directory**
   ```powershell
   mkdir C:\data\db
   ```

4. **Start MongoDB**
   ```powershell
   mongod
   ```

5. **Update .env File**
   ```env
   MONGO_URI=mongodb://localhost:27017/leettrack
   ```

---

## Testing Your Connection

1. **Create a test file: `server/test-db.js`**
   ```javascript
   import mongoose from "mongoose";
   import dotenv from "dotenv";
   
   dotenv.config();
   
   const testConnection = async () => {
     try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("✅ MongoDB Connected Successfully!");
       console.log(`📊 Database: ${mongoose.connection.name}`);
       console.log(`🌐 Host: ${mongoose.connection.host}`);
       process.exit(0);
     } catch (error) {
       console.error("❌ MongoDB Connection Failed:", error.message);
       process.exit(1);
     }
   };
   
   testConnection();
   ```

2. **Run the test**
   ```bash
   node test-db.js
   ```

3. **Expected Output**
   ```
   ✅ MongoDB Connected Successfully!
   📊 Database: leettrack
   🌐 Host: cluster0.xxxxx.mongodb.net (or localhost)
   ```

---

## Troubleshooting

### Error: "MongooseServerSelectionError"
- **Atlas**: Check if your IP is whitelisted and password is correct
- **Local**: Make sure MongoDB service is running: `net start MongoDB`

### Error: "Authentication failed"
- Check your username and password in connection string
- Ensure password doesn't contain special characters (or URL encode them)

### Error: "ECONNREFUSED"
- MongoDB service is not running
- Start it: `net start MongoDB`

### Port Already in Use
- Check if another MongoDB instance is running
- Change the port in connection string

---

## Recommended for Beginners

**Use MongoDB Atlas (Option 1)** because:
- ✅ No installation required
- ✅ Works immediately
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Works from anywhere
- ✅ Easy to manage

---

## Next Steps After Setup

1. Update `.env` with your MongoDB URI
2. Run `npm run dev` in the server directory
3. You should see:
   ```
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   Server running on port 5000
   ```

4. Test the API endpoints using Postman or Thunder Client
