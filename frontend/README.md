# React + Vite

# מתנדבים באדמה 🌱

**אתר גישור בין חקלאים הזקוקים לעזרה במשק לבין מתנדבים המעוניינים לתרום לחקלאות הישראלית.**  
ממשק ידידותי ויעיל לשיפור חוויית המשתמש, עם מפה אינטראקטיבית לניהול וארגון התנדבויות.

---

## תוכן עניינים
1. [מידע כללי](#מידע-כללי)
2. [תכונות עיקריות](#תכונות-עיקריות)
3. [טכנולוגיות](#טכנולוגיות)
4. [התקנה והפעלה](#התקנה-והפעלה)
5. [תרומות ותיעוד](#תרומות-ותיעוד)
6. [קרדיטים](#קרדיטים)

---

## מידע כללי

**מתנדבים באדמה** נבנה במטרה לייצר פלטפורמה המחברת בין חקלאים ומתנדבים בצורה חדשנית ופשוטה לשימוש.  
הפרויקט הוא ניסיון לשלב בין הטכנולוגיה לבין צרכים ממשיים בקהילה, ולהציע כלי שיכול לשמש אנשים בחיי היום-יום.  

---

## תכונות עיקריות
- **מפה אינטראקטיבית:** הצגת כל ההתנדבויות הזמינות לפי מיקום.  
  בלחיצה על נקודת ציון, ניתן לראות את פרטי ההתנדבות ולהירשם בקלות.
- **מייל אוטומטי:** הודעת אישור הרשמה/ביטול נשלחת למתנדב ולבעל המשק.
- **טופס לחקלאים:** כלי ידידותי לחקלאים לשליחת בקשה לפרסום התנדבות.
- **ממשק פשוט:** חוויית משתמש יעילה וקלה הן למתנדבים והן לחקלאים.

---

## טכנולוגיות

### צד לקוח:
- **Frontend:** React, JavaScript, CSS.  
- **מפה אינטראקטיבית:** Leaflet | © OpenStreetMap, © CARTO.

### צד שרת:
- **Backend:** Node.js עם Express.  
- **מסד נתונים:** MongoDB עם Mongoose.  
- **ניהול טפסים:** Multer, Formidable.  
- **שליחת מיילים:** Nodemailer.  
- **תמיכה ב-CORS:** Cors.  
- **ניהול משתני סביבה:** Dotenv.

---

## התקנה והפעלה

### שלבים להתקנת הפרויקט:
1. **שכפול המאגר:**
   ```bash
   git clone https://github.com/DIANABEnish/agri-volunteer-il
   cd repository-name
2. **התקנת תלות בממשק המשתמש:**
    cd client
    npm install
   **התקנת תלות בצד השרת :**
      cd server
      npm install

3. **הפעלת צד שרת:**
    npm start      
4. **הפעלת צד משתמש:**
   npm run dev

 **תרומות ותיעוד:**
 . פרויקט זה נמצא בשלבי פיתוח ראשוניים
  אשמח לשמוע רעיונות חדשים ולהוסיף שיפורים 

 **קרדיט**

פרויקט אישי במסגרת לימודי מדעי המחשב ופיתוח אתרים
                         . פותח על ידי- דיאנה בניש
                   מוזמנים לפנות בכל שאלה או הצעה 


                            