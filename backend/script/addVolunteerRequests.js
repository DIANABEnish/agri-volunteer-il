const mongoose = require('mongoose');
const VolunteerLocation = require('../models/volunteerLocation');

mongoose.connect('mongodb://localhost:27017/volunteerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const requests = [
  
  {
    area: 'שרון',
    location: 'הוד השרון',
    farmName: 'משק הדרים',
    volunteerType: 'קטיף תפוזים',
    lat: 32.1556, // קואורדינטות של אזור השרון
    lng: 34.8885,
    description: 'הצטרפו אלינו לקטיף תפוזים במשק הדרים שבהוד השרון. פעילות מהנה המתאימה לכל המשפחה, תורמת לחקלאות המקומית ומאפשרת ליהנות מיום באווירה כפרית ושמש חמימה. בואו לחוות את הטבע ולעזור בחיזוק חקלאי ישראל.',
    contactPerson: 'אורי כהן',
    contactPhone: '052-9876543',
    contactEmail: 'ori.cohen@example.com',
    imageUrl: '/image/קטיף תפוזים.png'
},

{
  area: 'שרון',
  location: 'כפר סבא',
  farmName: 'משק פרי השרון',
  volunteerType: 'קטיף תותים',
  lat: 32.1752, // קואורדינטות של כפר סבא
  lng: 34.9066,
  description: 'הצטרפו לקטיף תותים במשק פרי השרון שבכפר סבא! חוויה ייחודית ומעשירה לכל הגילאים. הפעילות מתאימה למשפחות, זוגות וקבוצות, וכוללת טעימות מתוקות של פירות ישר מהשדה. הזדמנות נהדרת ליהנות מהטבע ולתמוך בחקלאות הישראלית.',
  contactPerson: 'יעל לוי',
  contactPhone: '053-8765432',
  contactEmail: 'yael.levi@example.com',
  imageUrl: '/image/תותים.jpg'
},

{
  "area": "מרכז",
  "location": "תל אביב",
  "farmName": "משק חוות האדמה",
  "volunteerType": "עבודות חקלאיות",
  "lat": 32.0853, 
  "lng": 34.7818,
  "description": "הצטרפו להתנדבות חקלאית במשק חוות האדמה בתל אביב! סיוע בעבודות חקלאיות שונות ולקיחת חלק במאמץ החקלאי המקומי.",
  "contactPerson": "אורלי מזרחי",
  "contactPhone": "052-1234567",
  "contactEmail": "orly.mizrahi@example.com",
  "imageUrl": "/image/חקלאות.jpg"
},

  {
    area: 'צפון',
    location:'רמת הגולן',
    farmName: 'חוות הגולן',
    volunteerType:'קטיף תפוחים',
    lat: 33.12080, // קואורדינטה של רמת הגולן
    lng: 35.7221,
    description: 'הצטרפו אלינו לקטיף תפוחים ברמת הגולן. נהנה מנוף מרהיב ואוויר צלול תוך כדי עזרה לחקלאות המקומית. מתאים למשפחות וקבוצות.',
    contactPerson: 'יוסי כהן',
    contactPhone: '050-1234567',
    contactEmail: 'd01276183@gmail.com',
    imageUrl:'/image/קטיף תפוחים.jpg'
  },
 
  {
    area: 'צפון',
    location: 'חיפה',
    farmName: 'משק זית הגליל',
    volunteerType: 'קטיף זיתים',
    lat: 32.7940, // קואורדינטות של חיפה
    lng: 35.0488,
    description: 'הצטרפו אלינו לקטיף זיתים במשק זית הגליל שבחיפה! הזדמנות ייחודית להתחבר למסורת עתיקה ולסייע בייצור שמן זית איכותי. הפעילות מתאימה למשפחות, קבוצות וחובבי טבע, ותכלול הדרכה על תהליך גידול וקטיף הזיתים. בואו להיות חלק מחוויה ישראלית אמיתית.',
    contactPerson: 'מיכל ברק',
    contactPhone: '054-9876543',
    contactEmail: 'michal.barak@example.com',
    imageUrl: '/image/קטיף זיתים.jpg'
}
 ,
  {
    area: 'דרום',
    location: 'נגב',
    farmName: 'הנגב',
    volunteerType: 'שתילה',
    lat: 31.2430, // קואורדינטה כללית של הנגב
    lng: 34.7915,
    description: 'בואו לקחת חלק בשתילת עגבניות בחווה אורגנית בנגב. זו הזדמנות מצוינת ללמוד על חקלאות בת-קיימא ולתרום לביטחון המזון של ישראל.',
    contactPerson: 'רונית לוי',
    contactPhone: '052-9876543',
    contactEmail: 'd01276183@gmail.com',
    imageUrl: '/image/עגבניות.jpg'
  },
  {
    area: 'דרום',
    location: 'ערד',
    farmName: 'משק מלחת המדבר',
    volunteerType: 'קטיף תמרים',
    lat: 31.2589, // קואורדינטות של ערד
    lng: 35.2137,
    description: 'הצטרפו לקטיף תמרים במשק מלחת המדבר בערד! חוויה ייחודית בלב המדבר, הכוללת עבודה לצד נופי טבע מדהימים והכרת התמר - פרי המדבר האצילי. הפעילות מתאימה למשפחות, קבוצות וחובבי טבע, ותורמת לחיזוק החקלאות הישראלית באזור הדרום.',
    contactPerson: 'דני שמעון',
    contactPhone: '053-6543210',
    contactEmail: 'danny.shimon@example.com',
    imageUrl: '/image/תמרים.jpg'
}

];

VolunteerLocation.insertMany(requests)
  .then((docs) => {
    console.log(`${docs.length} בקשות התנדבות נשמרו בהצלחה`);
    console.log('דוגמה לנתונים שנשמרו:', docs[0]);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('שגיאה בשמירת בקשות:', err);
    mongoose.disconnect();
  });
