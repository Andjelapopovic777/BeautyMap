const express = require('express');
const router = express.Router();
const {
  dodajRecenziju,
  getRecenzijeZaSalon,
  getSveRecenzije,
  obrisiRecenziju
} = require('../controllers/recenzijaController');
const { protect, authorize } = require('../middleware/authMiddleware');


router.get('/', protect, authorize('admin'), getSveRecenzije);


router.get('/salon/:salonId', getRecenzijeZaSalon);


router.post('/salon/:salonId', protect, dodajRecenziju);


router.delete('/:id', protect, authorize('admin'), obrisiRecenziju);


module.exports = router;