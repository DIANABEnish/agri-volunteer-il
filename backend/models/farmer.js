const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    location: { type: String, required: true },
    farm_name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Farmer', farmerSchema);