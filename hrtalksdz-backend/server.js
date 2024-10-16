// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const episodesRouter = require('./routes/episodes');
app.use('/api/episodes', episodesRouter);



// Add a catch-all route for the root path
app.get('/', (req, res) => {
  res.send('HRTalksDZ API is running');
});

app.listen(5000, () => {
  console.log(`Server is running on port: ${5000}`);
});
