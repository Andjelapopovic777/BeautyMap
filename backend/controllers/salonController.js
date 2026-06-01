const Salon = require('../models/Salon');

// 1. Vlasnik kreira zahtev za salon (Automatski dobija status 'pending')
exports.createSalon = async (req, res) => {
  try {
    const { name, address, description, serviceType } = req.body;

    const salon = await Salon.create({
      name,
      address,
      description,
      serviceType,
      owner: req.user._id // ID ulogovanog vlasnika iz tokena
    });

    res.status(201).json({
      success: true,
      data: salon,
      message: 'Zahtev za registraciju salona je uspešno poslat i čeka odobrenje administratora!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 2. Javni prikaz: Klijenti i gosti na početnoj vide SAMO ODOBRENE salone!
exports.getApprovedSalons = async (req, res) => {
  try {
    const salons = await Salon.find({ status: 'approved' }).populate('owner', 'name email');
    res.status(200).json({ success: true, count: salons.length, data: salons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 3. Admin Panel: Prikaz svih zahteva na čekanju (status: 'pending') za administratora
exports.getPendingSalons = async (req, res) => {
  try {
    const salons = await Salon.find({ status: 'pending' }).populate('owner', 'name email');
    res.status(200).json({ success: true, count: salons.length, data: salons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 4. Admin Panel: Odobravanje ili odbijanje salona (Akcija admina klikom na dugme)
exports.reviewSalon = async (req, res) => {
  try {
    const { status } = req.body; // Iz frontenda šaljemo 'approved' ili 'rejected'
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Nevalidan status. Mora biti approved ili rejected.' });
    }

    const salon = await Salon.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!salon) {
      return res.status(404).json({ message: 'Salon nije pronađen.' });
    }

    res.status(200).json({
      success: true,
      data: salon,
      message: `Salon je uspešno ${status === 'approved' ? 'odobren' : 'odbijen'}.`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};

// 5. Vlasnik salona: Dodavanje nove usluge u cenovnik salona
exports.addSalonService = async (req, res) => {
  try {
    const { name, price } = req.body;

    // 1. Pronađi salon po ID-ju iz adrese (URL-a)
    const salon = await Salon.findById(req.params.id);

    if (!salon) {
      return res.status(404).json({ success: false, message: 'Salon nije pronađen' });
    }

    // 2. Bezbednosna provera: Samo pravi vlasnik salona sme da doda uslugu
    if (salon.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Nemate dozvolu da menjate cenovnik ovog salona' 
      });
    }

    // 3. Provera da li su polja popunjena
    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Molimo unesite naziv i cenu usluge' });
    }

    // 4. Gurni novu uslugu u niz 'services'
    salon.services.push({ name, price });

    // 5. Sačuvaj izmene u MongoDB bazi podataka
    await salon.save();

    res.status(200).json({
      success: true,
      message: 'Usluga je uspešno dodata u cenovnik!',
      data: salon.services
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Greška na serveru', error: error.message });
  }
};