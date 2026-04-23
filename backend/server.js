const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/expenseRoutes'));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense_tracker';
    console.log('Attempting to connect to external MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('External MongoDB Connected successfully');
  } catch (err) {
    console.error('External DB failed. Starting local in-memory database fallback...');
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('Local In-Memory MongoDB Connected successfully');
  }
};

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
