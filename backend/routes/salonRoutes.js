const express = require('express');
const router = express.Router();

// Svi uvozi iz kontrolera spojeni u jedan blok - bez dupliranja!
const { 
  createSalon, 
  getApprovedSalons, 
  getPendingSalons, 
  reviewSalon, 
  addSalonService 
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

// Ruta za dodavanje usluga: Samo ulogovani vlasnik salona sme da je pozove
router.post('/:id/services', protect, authorize('owner'), addSalonService);

module.exports = router;