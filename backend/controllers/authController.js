const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Registracija novog korisnika
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber } = req.body;

    // 1. Provera da li korisnik već postoji
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Korisnik sa ovim email-om već postoji' });
    }

    // 2. Hešovanje lozinke
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Kreiranje novog korisnika u bazi
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'owner',
      phoneNumber
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: "Uspešna registracija!"
      });
    } else {
      res.status(400).json({ message: 'Nevalidni podaci o korisniku' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Greška na serveru', error: error.message });
  }
};

// @desc    Autentifikacija korisnika i dobijanje tokena (Login)
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Pronalaženje korisnika preko email-a
    const user = await User.findOne({ email });

    // 2. Ako korisnik postoji, proveravamo da li se lozinke poklapaju
    if (user && (await bcrypt.compare(password, user.password))) {
      
      // 3. Generisanje JWT tokena (traje 30 dana)
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'tajni_kljuc_za_beautymap',
        { expiresIn: '30d' }
      );

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
        message: "Uspešan login!"
      });
    } else {
      res.status(401).json({ message: 'Neispravan email ili lozinka' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Greška na serveru', error: error.message });
  }
};