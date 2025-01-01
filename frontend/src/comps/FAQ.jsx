// FAQDropdown.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const FAQDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-dropdown-container" 
         onMouseEnter={() => setIsOpen(true)}
         onMouseLeave={() => setIsOpen(false)}>
       <span className="faq-title">שאלות נפוצות</span>
      {isOpen && (
        <div className="faq-dropdown-menu">
          <Link to="/volunteer-faq">שאלות מתנדבים</Link>
          <div className="dropdown-divider"></div>
          <Link to="/farmers-faq">שאלות חקלאים</Link>
        </div>
      )}
    </div>
  );
};


  export { FAQDropdown};