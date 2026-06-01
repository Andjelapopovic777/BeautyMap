const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const salonRoutes = require('./routes/salonRoutes');

const app = express();

// Povezivanje sa bazom podataka
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rute
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/salons', salonRoutes);

// Osnovna ruta
app.get('/', (req, res) => {
  res.send('BeautyMap API uspešno radi!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});