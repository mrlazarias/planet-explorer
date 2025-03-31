import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Planet from '../models/Planet';
import User from '../models/User';
import planetData from './planets';
import connectDB from '../config/db';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Import data into DB
const importData = async (): Promise<void> => {
  try {
    // Clear existing data
    await Planet.deleteMany({});
    await User.deleteMany({});

    // Import planets
    await Planet.insertMany(planetData);

    // Create default user
    await User.create({
      username: 'admin',
      password: 'password123',
    });

    console.log('Data imported successfully!');
    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data from DB
const destroyData = async (): Promise<void> => {
  try {
    await Planet.deleteMany({});
    await User.deleteMany({});

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run script based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 