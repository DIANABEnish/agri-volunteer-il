// controllers/cancelRegController.js
const VolunteerRegistration = require('../models/volunteerRegistration');
const { sendEmail, emailTemplates } = require('../services/emailService');

const cancelRegistration = async (req, res) => {
    try {
        const { locationId, email } = req.body;

        // מצא את ההרשמה עם populate למידע על החווה
        const existingRegistration = await VolunteerRegistration.findOne({ 
            locationId, 
            email 
        }).populate('locationId');

        if (!existingRegistration) {
            return res.status(404).json({ 
                success: false, 
                message: 'לא נמצאה הרשמה מתאימה עם המייל הזה' 
            });
        }

        // שלח מיילים לפני מחיקת ההרשמה
        try {
            await Promise.all([
                sendEmail(
                    email, 
                    emailTemplates.volunteerCancellation.volunteer.subject,
                    emailTemplates.volunteerCancellation.volunteer.text(existingRegistration.locationId.farmName)
                ),
                sendEmail(
                    existingRegistration.locationId.contactEmail,
                    emailTemplates.volunteerCancellation.farmer.subject,
                    emailTemplates.volunteerCancellation.farmer.text(existingRegistration.name)
                )
            ]);
        } catch (emailError) {
            console.error('Error sending cancellation emails:', emailError);
            // ממשיך למחוק את ההרשמה גם אם שליחת המייל נכשלה
        }

        // מחק את ההרשמה
        await VolunteerRegistration.deleteOne({ locationId, email });

        res.status(200).json({ 
            success: true, 
            message: 'ההרשמה בוטלה בהצלחה' 
        });
    } catch (error) {
        console.error('Error in cancelRegistration:', error);
        res.status(500).json({ 
            success: false, 
            message: 'אירעה שגיאה בביטול ההרשמה',
            error: error.message 
        });
    }
};

module.exports = { cancelRegistration };
