const express = require('express');
const path = require('path');
const cors = require('cors');
const fishRoutes = require('./fishRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', fishRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve React app for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
