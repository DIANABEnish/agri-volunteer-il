const mongoose = require('mongoose');

const volunteerRequestSchema = new mongoose.Schema({
  farmer: {
    name: { type: String, required: true },
    contact: { type: String, required: true }
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  taskDescription: { type: String, required: true },
  dateNeeded: { type: Date, required: true },
  volunteersNeeded: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['open', 'filled', 'cancelled'], 
    default: 'open' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add index for geospatial queries
volunteerRequestSchema.index({ location: '2dsphere' });

const VolunteerRequest = mongoose.model('VolunteerRequest', volunteerRequestSchema);

module.exports = VolunteerRequest;