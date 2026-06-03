const express = require('express');
const router = express.Router();
const { 
  createSalon, 
  getApprovedSalons, 
  getPendingSalons, 
  reviewSalon, 
  getMySalon 
} = require('../controllers/salonController');
const { protect, authorize } = require('../middleware/authMiddleware');

// OVE DVE LINIJE MORAJU BITI TU:
router.get('/pending', protect, authorize('admin'), getPendingSalons);
router.get('/approved', protect, authorize('admin'), getApprovedSalons);

router.get('/', getApprovedSalons);
router.get('/moj-salon', protect, authorize('owner'), getMySalon);
router.post('/', protect, authorize('owner'), createSalon);
router.put('/:id/review', protect, authorize('admin'), reviewSalon);

module.exports = router;