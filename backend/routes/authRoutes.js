const express = require('express');
const router = express.Router();
// Uvozimo obe funkcije iz kontrolera
const { registerUser, loginUser } = require('../controllers/authController'); 

// Definišemo rute
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;