const VolunteerRegistration = require('../models/volunteerRegistration');

const checkRegistration = async (req, res) => {
    try {
        const { locationId, email } = req.params;
        
        const registration = await VolunteerRegistration.findOne({ 
            locationId, 
            email 
        });

        res.json({ 
            isRegistered: !!registration,
            registration: registration 
        });
    } catch (error) {
        console.error('Error checking registration:', error);
        res.status(500).json({ 
            success: false, 
            message: 'אירעה שגיאה בבדיקת ההרשמה' 
        });
    }
};

module.exports = { checkRegistration };