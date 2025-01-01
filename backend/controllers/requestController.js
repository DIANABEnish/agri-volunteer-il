const VolunteerRequest = require('../models/volunteerRequest');

exports.createRequest = async (req, res) => {
    try {
        const newRequest = new VolunteerRequest(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await VolunteerRequest.find();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRequestById = async (req, res) => {
    res.json(res.volunteerRequest);
};

exports.updateRequest = async (req, res) => {
    if (req.body.farmer != null) {
        res.volunteerRequest.farmer = req.body.farmer;
    }
    // ... Update other fields similarly
    try {
        const updatedRequest = await res.volunteerRequest.save();
        res.json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRequest = async (req, res) => {
    try {
        await res.volunteerRequest.remove();
        res.json({ message: 'Volunteer request deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVolunteerRequest = async (req, res, next) => {
    try {
        const request = await VolunteerRequest.findById(req.params.id);
        if (request == null) {
            return res.status(404).json({ message: 'Volunteer request not found' });
        }
        res.volunteerRequest = request;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};