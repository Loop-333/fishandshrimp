// backend/server.js
const db = require('./db');
const express = require('express');
const cors = require('cors');
const fishRoutes = require('./fishRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API route to get all fish
app.use('/api', fishRoutes); // This means fishRoutes.js handles routes like /api/fish

app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});