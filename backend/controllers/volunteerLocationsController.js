// controllers/volunteerLocationsController.js

const VolunteerLocation = require('../models/volunteerLocation');

exports.getAreas = async (req, res) => {
  try {
    console.log('getAreas function called');
    const areas = await VolunteerLocation.distinct('area');
    console.log('Areas found:', areas);
    
    // בדיקה נוספת לראות את כל המסמכים באוסף
    const allDocs = await VolunteerLocation.find({});
    console.log('All documents:', allDocs);

    if (areas.length === 0) {
      console.log('No areas found in the database');
      return res.status(404).json({ message: 'No areas found' });
    }
    res.json(areas);
  } catch (error) {
    console.error('Error in getAreas:', error);
    res.status(500).json({ message: 'Error fetching areas', error: error.message });
  }
};

exports.getLocationsByArea = async (req, res) => {
  try {
    const { area } = req.params;
    console.log(`Fetching locations for area: ${area}`);
    const locations = await VolunteerLocation.find({ area });
    console.log('Locations found:', locations);
    
    if (locations.length === 0) {
      console.log(`No locations found for area: ${area}`);
      return res.status(404).json({ message: 'No locations found for this area' });
    }
    
    res.json(locations);
  } catch (error) {
    console.error('Error in getLocationsByArea:', error);
    res.status(500).json({ message: 'Error fetching locations', error: error.message });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    console.log('getAllLocations function called');
    const locations = await VolunteerLocation.find({});
    console.log('All locations found:', locations);

    if (locations.length === 0) {
      console.log('No locations found in the database');
      return res.json([]); 
    }
    res.json(locations);
  } catch (error) {
    console.error('Error in getAllLocations:', error);
    res.status(500).json({ message: 'Error fetching all locations', error: error.message });
  }
};