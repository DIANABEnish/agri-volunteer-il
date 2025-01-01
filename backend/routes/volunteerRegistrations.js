


  const express = require('express');
const router = express.Router();
const { registerVolunteer } = require('../controllers/registrationController');

router.post('/', registerVolunteer);

module.exports = router;
