

const mongoose = require('mongoose');

const volunteerLocationSchema = new mongoose.Schema({
  area: String,
  location: String,
  farmName: String,
  volunteerType: String,
  lat: Number,
  lng: Number,
  description: String, 
  contactPerson: String,
  contactPhone: String,
  contactEmail: String,
  imageUrl:String
});

module.exports = mongoose.model('VolunteerLocation', volunteerLocationSchema, 'volunteerlocations');
