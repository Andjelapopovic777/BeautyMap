const express = require('express');
const router = express.Router();
const { 
  createSalon, 
  getApprovedSalons, 
  getPendingSalons, 
  reviewSalon, 
  getMySalon,
  deleteSalon,
  getSalonById
} = require('../controllers/salonController');
const { protect, authorize } = require('../middleware/authMiddleware');

// OVE DVE LINIJE MORAJU BITI TU:
router.get('/pending', protect, authorize('admin'), getPendingSalons);
router.get('/approved', protect, authorize('admin'), getApprovedSalons);

router.get('/', getApprovedSalons);
router.get('/:id', getSalonById);
router.get('/moj-salon', protect, authorize('owner'), getMySalon);
router.post('/', protect, authorize('owner'), createSalon);
router.put('/:id/review', protect, authorize('admin'), reviewSalon);
router.delete('/:id', protect, authorize('admin'), deleteSalon);
router.delete('/moj-salon/:id', protect, authorize('owner'), deleteSalon);

// router.post("/:id/services", authMiddleware, async (req, res) => {
//   try {
//     const { name, price } = req.body;

//     const salon = await Salon.findById(req.params.id);

//     if (!salon) {
//       return res.status(404).json({ message: "Salon ne postoji" });
//     }

//     salon.services.push({
//       name,
//       price
//     });

//     await salon.save();

//     res.json(salon);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Greška pri dodavanju usluge" });
//   }
// });

module.exports = router;