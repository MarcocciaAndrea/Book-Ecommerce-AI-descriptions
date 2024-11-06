const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB connection
const mongoURI = 'mongodb://127.0.0.1:27017/bookstore';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
  });

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Book routes
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

// 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.url);
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`
Server is running!
------------------
> Local:    http://localhost:${PORT}
> Database: ${mongoURI}
> Time:     ${new Date().toISOString()}

Available routes:
- GET    /test           (test route)
- GET    /api/books      (get all books)
- POST   /api/books      (create book)
- GET    /api/books/:id  (get book by id)
- PUT    /api/books/:id  (update book)
- DELETE /api/books/:id  (delete book)
  `);
});