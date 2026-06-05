const mongoose = require('mongoose');

const RecenzijaSchema = new mongoose.Schema({
  salon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salon',
    required: true
  },
  korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tekst: {
    type: String,
    required: true,
    trim: true
  },
  ocena: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Recenzija', RecenzijaSchema);