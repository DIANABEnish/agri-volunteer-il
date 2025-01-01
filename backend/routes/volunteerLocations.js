// routes/volunteerLocations.js

const express = require('express');
const router = express.Router();
const volunteerLocationsController = require('../controllers/volunteerLocationsController');

router.get('/areas', volunteerLocationsController.getAreas);
router.get('/locations/:area', volunteerLocationsController.getLocationsByArea);
router.get('/all', volunteerLocationsController.getAllLocations);

module.exports = router;