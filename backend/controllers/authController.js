const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Korisnik sa ovim email-om već postoji' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      
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