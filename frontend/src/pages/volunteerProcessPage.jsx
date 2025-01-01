import React, { useEffect, useRef } from "react";
import './volunteerProcessPage.css';
import Header from '../comps/header.jsx';
import ImageCarousel from '../comps/imageCarousel.jsx';
import Footer from '../comps/footer';




const VolunteerRegProcess = () => {
  const carouselImages = [
   
    '/pic1.jpg',
    '/pic2.jpg',
    '/pic4.jpg',
    '/pic7.jpg',
    '/pic6.jpg',
    '/pic5.jpg',
    '/3.png',
    '/7.png',
   
  ];


  return (
    <div class="process">
       <Header/>
       
   
      <div className="registration_process" dir="rtl">
        <div className="title-container">
      <h2 className="title">תהליך ההרשמה</h2>
      </div>
        <p className="nav-pageDescription">עמוד זה יסייע לכם להבין את הצעדים הדרושים להרשמה להתנדבות. בכמה צעדים פשוטים, תוכלו לבחור את ההתנדבות המתאימה עבורכם, להרשם ולהצטרף לעשייה משמעותית לחיזוק החקלאות המקומית.</p>
        
        <div className="my-8">
          <ImageCarousel images={carouselImages} />
        </div>
        </div>


      <div className="content_container">
        <h3>איך זה עובד?</h3>
      <div className="process_details">
        <ol className="process_list">
          <li className="list_item">
            <h4>מצאו את האפשרות המתאימה לכם</h4>   
            <p className="item_description">
              עיינו במפה האינטראקטיבית או ברשימת הבקשות. תוכלו לראות פרטים על כל בקשה, כולל מיקום, תאריך, סוג העבודה הנדרשת ועוד.
            </p>
          </li>
          <li className="list_item">
           <h4>הירשמו להתנדבות</h4> 
            <p className="item_description">
              לחצו על כפתור "הרשמה להתנדבות" באפשרות שבחרתם. תדרשו למלא טופס קצר עם הפרטים הבאים:
              <ul className="sub_list">
                <li>שם מלא</li>
                <li>מספר טלפון</li>
                <li>כתובת דוא"ל</li>
                <li>מספר המתנדבים בקבוצה שלכם (אם רלוונטי)</li>
              </ul>
            </p>
          </li>
          <li className="list_item">
            <h4>קבלו אישור</h4>
            <p className="item_description">
              לאחר ההרשמה, תקבלו אישור במייל עם פרטי הבקשה והנחיות נוספות.
            </p>
          </li>
          <li className="list_item">
            <h4>התכוננו להתנדבות</h4>
            <p className="item_description">
              החקלאי יצור אתכם קשר לתיאום סופי. הכינו ציוד מתאים והגיעו בזמן למקום ההתנדבות.
            </p>
          </li>
          <li className="list_item">
            <h4>התנדבו ותרמו</h4>
            <p className="item_description">
              הגיעו למקום, בצעו את המשימה ותהנו מחוויה של עזרה לחקלאות הישראלית!
            </p>
          </li>
        </ol>
      </div>
    
      <p className="thanks">תודה על נכונותכם לעזור! יחד נשמור על החקלאות הישראלית חזקה ופורחת.</p>
      </div>
     
    <Footer/>
              
    <div className="footer-copyright">
  <p>
    
    Copyright ©{' '}
    <a
      className="web-link"
      href="https://mitnadvimb.il@gmail.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      מתנדבים באדמה
    </a>
    {` ${new Date().getFullYear()}`}
    <img
      src="/אייקון חטופים.png"
      alt="סמל החטופים"
      className="hostages-icon"
    />
  </p>
</div>
    </div>

  );
};

export default VolunteerRegProcess;



