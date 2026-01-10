import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testConnection = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log(`📝 Connection URI: ${process.env.MONGO_URI?.replace(/\/\/.*:.*@/, '//***:***@')}`);
    
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("\n✅ MongoDB Connected Successfully!");
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`✨ Connection is ready to use!\n`);
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ MongoDB Connection Failed!");
    console.error(`📛 Error: ${error.message}\n`);
    
    if (error.message.includes("ECONNREFUSED")) {
      console.log("💡 Tip: Make sure MongoDB service is running.");
      console.log("   Windows: net start MongoDB");
      console.log("   Or use MongoDB Atlas (cloud) - see MONGODB_SETUP.md\n");
    }
    
    if (error.message.includes("Authentication failed")) {
      console.log("💡 Tip: Check your MongoDB username and password in .env file\n");
    }
    
    process.exit(1);
  }
};

testConnection();
