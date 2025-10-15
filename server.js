const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const path = require('path');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ Serve static files before any API routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ (Optional) Test route to verify static files are accessible
app.get('/test-static', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', 'logo-1760513548508-171933616.webp'));
});
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/deals', require('./routes/deals'));
app.use('/api/blogs', require('./routes/blogs'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Hop4Deals API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

