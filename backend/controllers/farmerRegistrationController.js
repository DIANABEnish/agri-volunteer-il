const { sendEmail, emailTemplates } = require('../services/emailService');

const handleFarmerRegistration = async (req, res) => {
  try {
    console.log('Received registration request:', {
      body: req.body,
      files: req.files
    });

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'לא התקבלו נתונים בבקשה'
      });
    }

    const formData = req.body;

    // בדיקת שדות חובה
    const requiredFields = ['farmName', 'farmerName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `חסרים השדות הבאים: ${missingFields.join(', ')}`
      });
    }

    // טיפול בתמונות
    const uploadedImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    console.log('Uploaded images:', uploadedImages);
    formData.imageUrls = uploadedImages;

    try {
      // שליחת מייל לבעל המשק
      await sendEmail(
        formData.email,
        emailTemplates.farmerRegistration.farmer.subject,
        emailTemplates.farmerRegistration.farmer.text(formData.farmName)
      );

      // הוספת קישורי התמונות למייל המנהל
      const serverUrl = process.env.SERVER_URL || 'http://localhost:3003';
      const adminEmailText = emailTemplates.farmerRegistration.admin.text(formData) +
        '\n\nקישורים לתמונות שהועלו:\n' +
        uploadedImages.map(url => `${serverUrl}${url}`).join('\n');

      // שליחת מייל למנהל האתר
      await sendEmail(
        'mitnadvimb.il@gmail.com',
        emailTemplates.farmerRegistration.admin.subject,
        adminEmailText
      );

      console.log('Registration completed successfully');
      
      res.status(200).json({
        success: true,
        message: 'הבקשה התקבלה בהצלחה ונשלחה לבדיקה'
      });
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // גם אם יש בעיה במיילים, נחזיר הצלחה למשתמש
      res.status(200).json({
        success: true,
        message: 'הבקשה התקבלה בהצלחה'
      });
    }

  } catch (error) {
    console.error('Error in farmer registration:', error);
    res.status(500).json({
      success: false,
      message: 'אירעה שגיאה בתהליך הרישום'
    });
  }
};

module.exports = {
  handleFarmerRegistration
};