const VolunteerRegistration = require('../models/volunteerRegistration');
const VolunteerLocation = require('../models/volunteerLocation');
const { sendEmail, emailTemplates } = require('../services/emailService');

const registerVolunteer = async (req, res) => {
    try {
        const { name, phone, email, notes, locationId } = req.body;

        const existingRegistration = await VolunteerRegistration.findOne({ locationId, email });
        if (existingRegistration) {
            return res.status(400).json({ success: false, message: 'כבר נרשמת להתנדבות זו' });
        }

        const location = await VolunteerLocation.findById(locationId);
        if (!location) {
            return res.status(404).json({ success: false, message: 'מיקום ההתנדבות לא נמצא' });
        }

        const registration = new VolunteerRegistration({ name, phone, email, notes, locationId });
        await registration.save();

        await sendEmail(email, emailTemplates.volunteerRegistration.volunteer.subject,
            emailTemplates.volunteerRegistration.volunteer.text(location.farmName));

        await sendEmail(location.contactEmail, emailTemplates.volunteerRegistration.farmer.subject,
            emailTemplates.volunteerRegistration.farmer.text(name, phone, email, notes));

        res.status(201).json({ success: true, message: 'ההרשמה בוצעה בהצלחה', registration });
    } catch (error) {
        console.error('Error in registerVolunteer:', error);
        res.status(500).json({ success: false, message: 'אירעה שגיאה בתהליך ההרשמה' });
    }
};

module.exports = { registerVolunteer };
