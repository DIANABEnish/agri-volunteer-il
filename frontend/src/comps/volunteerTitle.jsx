import { useEffect, useState } from 'react';

const VolunteerTitle = () => {
    const subtitles = [
        "למען החקלאות הישראלית",
        "למען תמיכה בעסקים קטנים",
        "למען חיזוק החוסן החקלאי",
        "למען החוויה הייחודית",
    ];

    const [index, setIndex] = useState(0);
    const [active, setActive] = useState(true); // הגדרת מצב ההתחלה ל- true

    useEffect(() => {
        const interval = setInterval(() => {
            setActive(false); // הכנס את השקיפות ל-0 לפני שהכותרת משתנה
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % subtitles.length);
                setActive(true); // הכנס את השקיפות ל-1 לאחר שינוי הכותרת
            }, 2000); // המתן 1 שנייה לפני שמבצע את השינוי
        }, 5000); // 4000ms = 4 שניות

        return () => clearInterval(interval); // ניקוי הטיימר כשמפסיקים את הקומפוננטה
    }, [subtitles.length]);

    return (
        <div className='title-container'>
            <h2 className={`change-title ${active ? 'change-title-active' : ''}`}>
                {subtitles[index]}
            </h2>
        </div>
    );
}

export default VolunteerTitle;
