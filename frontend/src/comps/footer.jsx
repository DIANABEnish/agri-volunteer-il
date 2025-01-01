import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';  
import { Email, Phone } from '@mui/icons-material';
import './footer.css';


const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Box className="footer-container">
          <Box className="footer-section">
            <Typography variant="h6" className="footer-heading">
              אודות מתנדבים באדמה
            </Typography>
            <Typography variant="body2" className="footer-text">
              "מתנדבים באדמה" הינה פלטפורמה חדשנית שנוצרה כמענה לאתגרים העכשוויים בחקלאות הישראלית. 
              חזוננו הוא ליצור גשר דיגיטלי יעיל בין חקלאים הזקוקים לסיוע לבין מתנדבים המבקשים לתרום. 
              באמצעות מפה אינטראקטיבית ידידותית למשתמש, אנו מאפשרים:
               למתנדבים - למצוא בקלות הזדמנויות התנדבות מתאימות באזורם.
               לחקלאים - לפרסם בפשטות את צורכי ההתנדבות שלהם.
              מטרתנו היא לחזק את החקלאות הישראלית ולהבטיח את המשך הייצור החקלאי המקומי.
            </Typography>
          </Box>
          <Box className="footer-section">
            <Typography variant="h6" className="footer-heading">
              צור קשר
            </Typography>
            <Box className="footer-contact">
              <Email /> mitnadvimb.il@gmail.com
            </Box>
            <Box className="footer-contact">
              <Phone /> 052-622-5529
            </Box>
          </Box>
          <Box className="footer-section">
            <Typography variant="h6" className="footer-heading">
              הצטרפו אלינו
            </Typography>
            <Button variant="contained" className="footer-button">
            <Link to="/volunteer-page" className="volunteer-link">
            הירשמו כמתנדבים
            </Link>
            </Button>
            <Button variant="contained" className="footer-button">
              <Link to= "/farmers-join" className='farmers-link'> פרסמו התנדבות</Link>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;