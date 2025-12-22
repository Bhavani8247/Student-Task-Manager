const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // ✅ added

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err.message));

const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
    server.listen(PORT + 1);
  }
});
