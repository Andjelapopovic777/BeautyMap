const Salon = require('../models/Salon');

exports.createSalon = async (req, res) => {
  try {
    const { imeSalona, lokacija, telefon } = req.body;
    const salon = await Salon.create({ name: imeSalona, address: lokacija, phone: telefon, owner: req.user._id });
    res.status(201).json({ success: true, data: salon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getApprovedSalons = async (req, res) => {
  try {
    const salons = await Salon.find({ status: 'approved' });
    res.status(200).json({ success: true, data: salons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPendingSalons = async (req, res) => {
  try {
    const salons = await Salon.find({ status: 'pending' });
    res.status(200).json({ success: true, data: salons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.reviewSalon = async (req, res) => {
  try {
    const { status } = req.body;
    const salon = await Salon.findByIdAndUpdate(req.params.id, { status: status }, { new: true });
    res.status(200).json({ success: true, data: salon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMySalon = async (req, res) => {
  try {
    const salon = await Salon.findOne({ owner: req.user._id });
    if (!salon) return res.status(404).json({ message: 'Nije pronađen' });
    res.json(salon);
  } catch (err) {
    res.status(500).json({ message: 'Greška' });
  }
};

exports.deleteSalon = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: 'Salon nije pronađen'
      });
    }

    await Salon.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Salon uspešno obrisan'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getSalonById = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (!salon) return res.status(404).json({ success: false, message: 'Salon nije pronađen' });
    res.status(200).json({ success: true, data: salon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

exports.updateWorkingHours = async (req, res) => {
  try {
    const { monFri, sat, sun } = req.body;

    const salon = await Salon.findOne({
      owner: req.user._id
    });

    if (!salon) {
      return res.status(404).json({
        success: false,
        message: 'Salon nije pronađen'
      });
    }

    salon.workingHours = {
      monFri,
      sat,
      sun
    };

    await salon.save();

    res.status(200).json({
      success: true,
      data: salon,
      message: 'Radno vreme uspešno ažurirano'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};