const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

const salonRoutes = require('./routes/salonRoutes'); 
console.log("Salon rute su učitane!");

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/saloni', salonRoutes);

app.get('/', (req, res) => {
  res.send('BeautyMap API uspešno radi!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});