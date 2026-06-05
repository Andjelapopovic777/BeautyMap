const Recenzija = require('../models/Recenzija');


exports.dodajRecenziju = async (req, res) => {
  try {
    const { tekst, ocena } = req.body;
    const { salonId } = req.params;

    const recenzija = await Recenzija.create({
      salon: salonId,
      korisnik: req.user._id,
      tekst,
      ocena
    });

    
    await recenzija.populate('korisnik', 'name');

    res.status(201).json({ success: true, data: recenzija });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRecenzijeZaSalon = async (req, res) => {
  try {
    const recenzije = await Recenzija.find({ salon: req.params.salonId })
      .populate('korisnik', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: recenzije });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getSveRecenzije = async (req, res) => {
  try {
    const recenzije = await Recenzija.find()
      .populate('korisnik', 'name')
      .populate('salon', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: recenzije });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.obrisiRecenziju = async (req, res) => {
  try {
    const recenzija = await Recenzija.findByIdAndDelete(req.params.id);

    if (!recenzija) {
      return res.status(404).json({ success: false, message: 'Recenzija nije pronađena' });
    }

    res.status(200).json({ success: true, message: 'Recenzija obrisana' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};