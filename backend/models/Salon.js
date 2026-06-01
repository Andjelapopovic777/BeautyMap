const mongoose = require('mongoose');

const SalonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Molimo unesite naziv salona'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Molimo unesite adresu salona']
  },
  description: {
    type: String,
    required: [true, 'Molimo unesite opis salona']
  },
  serviceType: {
    type: String,
    required: [true, 'Molimo unesite tip usluge (npr. frizerski, kozmeticki)'],
    enum: ['frizerski', 'kozmeticki', 'masaza', 'nokti', 'drugo'] // ograničavamo tipove
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending' // Svaki salon je na početku na čekanju!
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Povezujemo salon sa korisnikom koji ga je napravio
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const mongoose = require('mongoose');

// Šema za pojedinačnu uslugu u cenovniku
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const SalonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Molimo unesite naziv salona'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Molimo unesite adresu salona']
  },
  description: {
    type: String,
    required: [true, 'Molimo unesite opis salona']
  },
  serviceType: {
    type: String,
    required: [true, 'Molimo unesite tip usluge'],
    enum: ['frizerski', 'kozmeticki', 'masaza', 'nokti', 'drugo']
  },
  // DODATO: Radno vreme tačno po tvojim komponentama sa fronta
  workingHours: {
    monFri: { type: String, default: '09:00 - 20:00' },
    sat: { type: String, default: '09:00 - 17:00' },
    sun: { type: String, default: '10:00 - 15:00' }
  },
  // DODATO: Niz usluga za tvoj "Usluge i cenovnik" deo
  services: [ServiceSchema],
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Salon', SalonSchema);

// Eksportujemo model BEZ vitičastih zagrada da bi ga kontroler lakše prepoznao
module.exports = mongoose.model('Salon', SalonSchema);