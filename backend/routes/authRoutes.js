const express = require('express');
const router = express.Router();
// Uvozimo obe funkcije iz kontrolera
const { registerUser, loginUser } = require('../controllers/authController');

// Ruta za registraciju
router.post('/register', registerUser);

// Ruta za login
router.post('/login', loginUser);

module.exports = router;