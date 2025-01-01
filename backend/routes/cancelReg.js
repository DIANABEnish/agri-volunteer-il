


const express = require('express');
const router = express.Router();
const { cancelRegistration } = require('../controllers/cancelRegController');

router.delete('/', cancelRegistration);

module.exports = router;
