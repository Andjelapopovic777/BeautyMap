const express = require('express');
const router = express.Router();
const { 
  createSalon, 
  getApprovedSalons, 
  getPendingSalons, 
  reviewSalon 
} = require('../controllers/salonController');

// Uvozimo zaštitne middleware-e
const { protect, authorize } = require('../middleware/authMiddleware');

// Javna ruta: Svi mogu da vide odobrene salone na početnoj stranici
router.get('/', getApprovedSalons);

// Ruta za vlasnike: Samo ulogovani korisnik sa ulogom 'owner' može poslati zahtev
router.post('/', protect, authorize('owner'), createSalon);

// Rute za administratore: Samo korisnik sa ulogom 'admin' ima pristup ovome
router.get('/pending', protect, authorize('admin'), getPendingSalons);
router.put('/:id/review', protect, authorize('admin'), reviewSalon);

module.exports = router;