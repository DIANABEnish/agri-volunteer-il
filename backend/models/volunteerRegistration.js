const mongoose = require('mongoose');

const volunteerRegistrationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    notes: String,
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'VolunteerLocation' }
});

module.exports = mongoose.model('VolunteerRegistration', volunteerRegistrationSchema, 'volunteerregistrations');
