const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // 1. Uvozimo funkciju za povezivanje

const app = express();

// Povezivanje sa bazom podataka
connectDB(); // 2. Pokrećemo povezivanje sa MongoDB

// Middleware
app.use(cors());
app.use(express.json());

// Osnovna ruta
app.get('/', (req, res) => {
  res.send('BeautyMap API uspešno radi!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});