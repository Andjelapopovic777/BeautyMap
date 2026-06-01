const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware koji proverava da li je korisnik uopšte ulogovan (ima validan token)
const protect = async (req, res, next) => {
  let token;

  // Proveravamo da li token stiže u ispravnom Bearer formatu unutar Headers-a
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Izvlačimo sam token (brišemo reč 'Bearer' i uzimamo samo dugački niz)
      token = req.headers.authorization.split(' ')[1];

      // Dekodiramo token pomoću tajnog ključa iz .env fajla
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tajni_kljuc_za_beautymap');

      // Pronalazimo korisnika u bazi na osnovu ID-ja iz tokena, ali preskačemo lozinku zbog bezbednosti
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Sve je u redu, pusti zahtev dalje ka kontroleru!
    } catch (error) {
      return res.status(401).json({ message: 'Niste autorizovani, token je nevalidan' });
    }
  }

  // Ako token uopšte nije poslat
  if (!token) {
    return res.status(401).json({ message: 'Niste autorizovani, token nedostaje' });
  }
};

// Middleware koji proverava korisničke uloge (npr. da li je 'owner' ili 'admin')
const authorize = (...roles) => {
  return (req, res, next) => {
    // Proveravamo da li ulogovani korisnik ima ulogu koja se traži za tu rutu
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Korisnik sa ulogom (${req.user?.role || 'gost'}) nema dozvolu za ovu akciju` 
      });
    }
    next(); // Korisnik ima dozvolu, pusti ga dalje!
  };
};

// Obavezno eksportujemo obe funkcije kao objekat da bi rute mogle da ih uvezu!
module.exports = { protect, authorize };