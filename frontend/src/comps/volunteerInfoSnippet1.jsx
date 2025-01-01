import React from "react";
import { Link } from "react-router-dom";
import VolunteerRegProcess from "../pages/volunteerProcessPage";
import './volunteerInfoSnippet1.css';

const VolunteerInfoSnippet1 = () =>{
    return(
        <div className="volunteerGeneralInfo" dir="rtl">
            <div className="info-container">
            <h2 className="general-info">איך מצטרפים?</h2>
            <div className="info-text">
            <ul className="general-steps">
                <li>מצאו אופציה מתאימה במפה או מתוך הרשימה</li>
                <li>הירשמו למשימת ההתנדבות שבחרתם</li>
                <li>קבלו אישור הרשמה במייל</li>
                <li>הגיעו למקום ותרמו לחקלאות הישראלית</li>
            </ul>
            
        <button className="link-button">
        <Link to="/volunteer-page" className="volunteer-link">
        למידע מפורט על תהליך ההתנדבות
      </Link>
        </button>
       
        </div>
        </div>
        </div>
    )
}

export default VolunteerInfoSnippet1;