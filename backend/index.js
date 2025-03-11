const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Sono Smart API is running' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
