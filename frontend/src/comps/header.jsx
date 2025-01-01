import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FAQDropdown } from './FAQ';
import MobileHeader from './MobileHeader';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // הוספת האזנה לשינויי גודל מסך
    window.addEventListener('resize', handleResize);
    
    // ניקוי האזנה בעת פירוק הקומפוננטה
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileHeader />
      ) : (
        <header className='site-header'>
          <div className="logo-container">
            <img src="/logo.png" alt="Site Logo" className="site-logo" />
          </div>

          <nav className={`nav-container ${isMenuOpen ? 'menu-open' : ''}`}>
            <ul className='nav-site'>
              <Link to="/">דף הבית</Link>
              <Link to="/volunteer-page">הצטרפות מתנדבים</Link>
              <Link to="/farmers-join">הצטרפות חקלאים</Link>
              <FAQDropdown />
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;