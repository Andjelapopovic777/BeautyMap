const express = require('express');
const router = express.Router();
const { 
  createSalon, 
  getApprovedSalons, 
  getPendingSalons, 
  reviewSalon, 
  getMySalon,
  deleteSalon,
  getSalonById,
  updateWorkingHours,
  updateServices,
  updateBasicInfo        
} = require('../controllers/salonController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/pending', protect, authorize('admin'), getPendingSalons);
router.get('/approved', protect, authorize('admin'), getApprovedSalons);
router.get('/moj-salon', protect, authorize('owner'), getMySalon);
router.put( '/moj-salon/working-hours', protect, authorize('owner'), updateWorkingHours);
router.put( '/moj-salon/services', protect, authorize('owner'), updateServices);
router.put('/moj-salon/basic-info', protect, authorize('owner'), updateBasicInfo);

router.get('/', getApprovedSalons);
router.get('/:id', getSalonById);
router.post('/', protect, authorize('owner'), createSalon);
router.put('/:id/review', protect, authorize('admin'), reviewSalon);
router.delete('/:id', protect, authorize('admin'), deleteSalon);
router.delete('/moj-salon/:id', protect, authorize('owner'), deleteSalon);

module.exports = router;