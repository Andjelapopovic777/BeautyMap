const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tajni_kljuc_za_beautymap');

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Niste autorizovani, token je nevalidan' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Niste autorizovani, token nedostaje' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Korisnik sa ulogom (${req.user?.role || 'gost'}) nema dozvolu za ovu akciju` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize };