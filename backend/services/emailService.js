const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

const emailTemplates = {
    volunteerRegistration: {
        volunteer: {
            subject: 'אישור הרשמה להתנדבות',
            text: (farmName) => 
                `,שלום\n\n` +
                `. אנו מודים לך על הרשמתך להתנדבות ב ${farmName}\n` +
                `.אנו מעריכים את נכונותך לתרום ולסייע לחקלאות הישראלית\n\n` +
                `.פרטי ההתנדבות הועברו לבעל המשק, אשר ייצור איתך קשר בהקדם\n\n` +
                `,בברכה\n` +
                `צוות מתנדבים באדמה`
        },
        farmer: {
            subject: 'הרשמה חדשה להתנדבות',
            text: (volunteerName, volunteerPhone, volunteerEmail, notes) =>
                `,שלום\n\n` +
                `:מתנדב/ת חדש/ה נרשמ/ה להתנדבות\n\n` +
                `שם: ${volunteerName}\n` +
                `טלפון: ${volunteerPhone}\n` +
                `דוא"ל: ${volunteerEmail}\n` +
                `הערות: ${notes || 'לא צוינו הערות'}\n\n` +
                `.נבקשך ליצור קשר עם המתנדב/ת בהקדם האפשרי\n\n` +
                `,בברכה\n` +
                `צוות מתנדבים באדמה`
        }
    },
    volunteerCancellation: {
        volunteer: {
            subject: 'אישור ביטול הרשמה להתנדבות',
            text: (farmName) =>
                'שלום,\n' +
                `הרינו לאשר את ביטול הרשמתך להתנדבות .\n` +
                'נשמח לראותך בהתנדבויות עתידיות.\n' +
                'בברכה,\n' +
                'צוות מתנדבים באדמה'
        }
    ,
        farmer: {
            subject: 'ביטול הרשמה להתנדבות',
            text: (volunteerName) =>
                `,שלום\n\n` +
                `.ביטל/ה את הרשמתו/ה להתנדבות במשק שלך ${volunteerName} ברצוננו לעדכן כי המתנדב/ת\n` +
                `.ההרשמה להתנדבות נשארת פתוחה למתנדבים נוספים\n\n` +
                `,בברכה\n` +
                `צוות מתנדבים באדמה`
        }
    },

    farmerRegistration: {
        farmer: {
          subject: 'אישור קבלת בקשת רישום למערכת מתנדבים באדמה',
          text: (farmName) => `
            שלום ${farmName},
            
            תודה על הרשמתך למערכת מתנדבים באדמה.
            בקשתך התקבלה בהצלחה ותעבור לבדיקה בהקדם.
            
            לאחר אישור הבקשה, נפרסם את פרטי ההתנדבות באתר וניצור איתך קשר.
            
            בברכה,
            צוות מתנדבים באדמה
          `
        },
        admin: {
          subject: 'בקשת רישום חדשה ממשק חקלאי',
          text: (data) => `
            בקשת רישום חדשה התקבלה:
            
            פרטי המשק:
            שם המשק: ${data.farmName}
            שם החקלאי: ${data.farmerName}
            טלפון: ${data.phone}
            דוא"ל: ${data.email}
            אזור: ${data.region}
            כתובת: ${data.address}
            
            פרטי העבודה:
            תיאור המשק: ${data.description}
            סוגי גידולים: ${data.cropType}
            סוג העבודה: ${data.workType}
            גודל השטח: ${data.farmSize}
            ניסיון נדרש: ${data.experienceRequired}
            
            פרטי ההתנדבות:
            מספר מתנדבים: ${data.volunteerCount}
            תאריך התחלה: ${data.startDate}
            תאריך סיום: ${data.endDate}
            שעות עבודה: ${data.workHours}
            דרישות מיוחדות: ${data.requirements}
            
            תנאים:
            לינה: ${data.accommodation ? 'כן - ' + data.accommodationDetails : 'לא'}
            ארוחות: ${data.meals ? 'כן - ' + data.mealsDetails : 'לא'}
            הסעות: ${data.transportation ? 'כן - ' + data.transportationDetails : 'לא'}
          `
        }
      }

    
};

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendEmail,
    emailTemplates
};
