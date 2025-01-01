const express = require('express');
const router = express.Router();
const { checkRegistration } = require('../controllers/checkRegistrationController');

router.get('/:locationId/:email', checkRegistration);

module.exports = router;