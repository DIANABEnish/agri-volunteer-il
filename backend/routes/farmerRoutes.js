

const express = require('express');
const router = express.Router();
const { handleFarmerRegistration } = require('../controllers/farmerRegistrationController');

// השתמש ב-'/' במקום '/register-farmer' כי הנתיב כבר מוגדר ב-server.js
router.post('/', handleFarmerRegistration);

module.exports= router;