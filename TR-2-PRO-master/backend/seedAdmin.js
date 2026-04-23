const mongoose = require('mongoose');
const User = require('./models/userModel');

const seed = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/technoprobatchfirst');
    console.log('Connected to DB');

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@test.com' });
    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const admin = new User({
      name: 'Admin',
      email: 'admin@test.com',
      phone: '1234567890',
      password: 'Password@123',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin account created successfully!');
    console.log('Email: admin@test.com');
    console.log('Password: Password@123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seed();
