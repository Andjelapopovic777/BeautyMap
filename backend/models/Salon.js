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
  // OVO VIŠE NIJE OBAVEZNO (required: false)
  description: {
    type: String,
    required: false 
  },
  // OVO VIŠE NIJE OBAVEZNO (uklonjen enum da ne blokira slanje)
  serviceType: {
    type: String,
    required: false
  },
  // Dodala sam telefon koji ti treba u formi
  phone: {
    type: String,
    required: [true, 'Molimo unesite broj telefona']
  },
  workingHours: {
    monFri: { type: String, default: '09:00 - 20:00' },
    sat: { type: String, default: '09:00 - 17:00' },
    sun: { type: String, default: '10:00 - 15:00' }
  },
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