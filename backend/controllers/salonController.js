const Salon = require('../models/Salon');

// 1. Vlasnik kreira zahtev za salon
exports.createSalon = async (req, res) => {
  try {
    const { name, address, description, serviceType } = req.body;
    const salon = await Salon.create({
      name,
      address,
      description,
      serviceType,
      owner: req.user._id
    });
    res.status(201).json({ success: true, data: salon, message: 'Zahtev uspešno poslat!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 2. Javni prikaz: Samo odobreni saloni
exports.getApprovedSalons = async (req, res) => {
  try {
    const salons = await Salon.find({ status: 'approved' }).populate('owner', 'name email');
    res.status(200).json({ success: true, count: salons.length, data: salons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 3. Admin Panel: Zahtevi na čekanju
exports.getPendingSalons = async (req, res) => {
  try {
    const salons = await Salon.find({ status: 'pending' }).populate('owner', 'name email');
    res.status(200).json({ success: true, count: salons.length, data: salons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 4. Admin: Odobravanje ili odbijanje
exports.reviewSalon = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Nevalidan status.' });
    }
    const salon = await Salon.findByIdAndUpdate(req.params.id, { status: status }, { new: true, runValidators: true });
    if (!salon) return res.status(404).json({ message: 'Salon nije pronađen.' });
    res.status(200).json({ success: true, data: salon, message: `Salon je uspešno ${status}.` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 5. Vlasnik: Dodavanje usluge
exports.addSalonService = async (req, res) => {
  try {
    const { name, price } = req.body;
    const salon = await Salon.findById(req.params.id);
    if (!salon) return res.status(404).json({ success: false, message: 'Salon nije pronađen' });
    if (salon.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Nemate dozvolu' });
    }
    if (!name || !price) return res.status(400).json({ success: false, message: 'Popunite podatke' });
    salon.services.push({ name, price });
    await salon.save();
    res.status(200).json({ success: true, message: 'Usluga dodata!', data: salon.services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 6. NOVO: Dobijanje jednog salona po ID-ju (za SalonDetalji.js)
exports.getSalonById = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (!salon) return res.status(404).json({ success: false, message: 'Salon nije pronađen' });
    res.status(200).json({ success: true, data: salon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// IZVOZ SVIH FUNKCIJA
module.exports = {
  createSalon: exports.createSalon,
  getApprovedSalons: exports.getApprovedSalons,
  getPendingSalons: exports.getPendingSalons,
  reviewSalon: exports.reviewSalon,
  addSalonService: exports.addSalonService,
  getSalonById: exports.getSalonById
};