const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// 1. PRVO kreiraj app
const app = express();

// 2. ONDA koristi middleware (json i cors)
app.use(cors());
app.use(express.json());

// 3. TEK SADA uvozi i koristi rute
const salonRoutes = require('./routes/salonRoutes'); 
console.log("Salon rute su učitane!");

// Povezivanje sa bazom podataka
connectDB();

// Rute
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/saloni', salonRoutes); // Ovde su tvoje rute

// Osnovna ruta
app.get('/', (req, res) => {
  res.send('BeautyMap API uspešno radi!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});