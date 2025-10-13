// 🚀 Main Server File

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();

const app = express();

// ⚙️ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📖 Routes
app.use('/api/lands', require('./routes/lands'));
app.use('/api/users', require('./routes/users'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/predictions', require('./routes/predictions'));

// ❌ Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '❌ Route not found'
  });
});

// 🚀 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════╗
  ║  🌍 AI SHAMBA  BACKEND       ║
  ║  🚀 Server running on port ${PORT}     ║
  ║  ✅ Ready to receive requests!      ║
  ╚════════════════════════════════════╝
  `);
});