import React, { useState, useEffect } from 'react';


import axios from 'axios';

import Header from '../comps/header';
import Footer from '../comps/footer';
import VolunteerMap from '../comps/volunteerMap';
import VolunteerInfoSnippet1 from '../comps/volunteerInfoSnippet1';
import VolunteerInfoSnippet2 from '../comps/volunteerInfoSnippet2';
import VolunteerTitle from '../comps/volunteerTitle';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Users, Heart, HandHeart } from 'lucide-react';
import { Button, Card, CardContent, CardMedia, Typography, Grid2 } from '@mui/material';


import LocationOnIcon from '@mui/icons-material/LocationOn';
import './HomePage.css';

import ImageSlider from '../comps/imageSlider';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Home = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [mapLocations, setMapLocations] = useState([]); // כל המיקומים למפה
const [listLocations, setListLocations] = useState([]); // מיקומים מסוננים לרשימה
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState({});

    // Helper function to sort areas in the desired order
    const sortAreas = (areasArray) => {
      const orderMap = {
        'צפון': 1,
        'שרון': 2,
        'מרכז': 3,
        'דרום': 4
      };
      
      return areasArray.sort((a, b) => {
        return (orderMap[a] || 999) - (orderMap[b] || 999);
      });
    };


  
  useEffect(() => {
    fetchAreas();
    fetchAllLocations();
  }, []);


  useEffect(() => {
    if (mapLocations.length > 0) {
      mapLocations.forEach(loc => {
        if (loc.imageUrl) {
          const img = new Image();
          img.src = `http://localhost:3003${loc.imageUrl}`;
          img.onerror = () => console.error(`Failed to load image for ${loc.farmName}: ${img.src}`);
        }
      });
    }
  }, [mapLocations]);

  useEffect(() => {
    if (listLocations.length > 0) {
      listLocations.forEach(loc => {
        if (loc.imageUrl) {
          const img = new Image();
          img.src = `http://localhost:3003${loc.imageUrl}`;
          img.onerror = () => console.error(`Failed to load image for ${loc.farmName}: ${img.src}`);
        }
      });
    }
  }, [listLocations]);

  const fetchAreas = async () => {
    try {
      const response = await axios.get('/api/volunteer-locations/areas');
      // Sort the areas before setting them in state
      const sortedAreas = sortAreas(response.data);
      setAreas(sortedAreas);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setError('שגיאה בטעינת האזורים');
    }
  };

  
  const fetchAllLocations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/volunteer-locations/all');
      if (response.data?.length > 0) {
        setMapLocations(response.data);
      }
    } catch (error) {
      setError('שגיאה בטעינת המיקומים');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAreaClick = async (area) => {
    setSelectedArea(area);
    try {
      const response = await axios.get(`/api/volunteer-locations/locations/${area}`);
      setListLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setModalOpen(true); 
  };

  return (
    <div className='home-page'>
      <div>
        <main>
          <ImageSlider>
            <Header />
            <h1 className="page_title">מתנדבים באדמה</h1>
            <VolunteerTitle/>
            
            <div className="opening_paragraph" dir='rtl'>
              <p>
              ברוכים הבאים ל"מתנדבים באדמה" - הגשר בין מתנדבים לחקלאים בישראל. החקלאות הישראלית ממשיכה להתמודד עם אתגרים משמעותיים, כשחקלאים רבים זקוקים לידיים עובדות ותמיכה מהקהילה.
              </p>
              <p>
                האתר שלנו מחבר בין מתנדבים לבין חקלאים הזקוקים לעזרה. בין אם אתם מתנדבים המחפשים דרך משמעותית לתרום, או חקלאים המבקשים סיוע, "מתנדבים באדמה" מספקת פלטפורמה נגישה וידידותית למשתמש.
              </p>
              <p>
                יחד, נוכל לשמור על החקלאות הישראלית פורחת ולחזק את הקשר בין העם לאדמתו.
              </p>
            </div>
          </ImageSlider>

          <VolunteerInfoSnippet1 />

          <div className="volunteer-map-section">
      <div className="volunteer-map-container">
        <div className="content-grid">
          {/* Map Wrapper */}
          <div className="map-wrapper">
            {isLoading ? (
              <div className="loading-overlay">טוען...</div>
            ) : error ? (
              <div className="error-overlay">
                שגיאה בטעינת המיקומים: {error}
              </div>
            ) : (
              <VolunteerMap
              locations={mapLocations}
              onLocationSelected={handleLocationClick}
              />
            )}
          </div>

          {/* Content Wrapper */}
          <div className="content-wrapper">
            {/* Map Explanation */}
            <div className="map-explanation">
              <h2 className="map-headline">מפת התנדבויות</h2>
              <div className="map-text">
                <p>
                  על מפת ארץ ישראל תוכלו למצוא נקודות ציון של אתרי התנדבות ברחבי הארץ -
                  כל סמן במפה מייצג מיקום התנדבות ייחודי.
                  לחצו על נקודת ציון במפה כדי לקבל מידע מקיף על ההתנדבות הספציפית.
                </p>
                <p>
                  מצאתם התנדבות שמתאימה לכם? לחצו על כפתור ההרשמה כדי להתחיל את התהליך.
                  מוזמנים לחקור את המפה ולמצוא את ההתנדבות המתאימה לכם.
                  יחד, נוכל לעשות שינוי משמעותי בקהילות שלנו.
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="feature-cards">
              <div className = "first-card">
              <div className="feature-card">
                <div className="card-content">
                  <h3>מצאו הזדמנויות בקרבתכם</h3>
                  <p>גלו מגוון אפשרויות התנדבות באזורכם</p>
                </div>
                <div className="card-icon">
                  <MapPin size={24} />
                </div>
              </div>
              </div>

              <div className="feature-card">
                <div className="card-content">
                  <h3>הצטרפו לקהילה תומכת</h3>
                  <p>היו חלק ממשפחת המתנדבים שלנו</p>
                </div>
                <div className="card-icon">
                  <Users size={24} />
                </div>
              </div>

              <div className="feature-card">
                <div className="card-content">
                  <h3>צרו השפעה אמיתית</h3>
                  <p>כל פעולה קטנה יוצרת שינוי גדול</p>
                </div>
                <div className="card-icon">
                  <HandHeart size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

          <div className="areas-section" dir='rtl'>
            <h2 className="areas-headline">אזורי התנדבות זמינים</h2>
            <div className="area-buttons">
              {areas.map(area => (
                <Button 
                  key={area} 
                  onClick={() => handleAreaClick(area)}
                  variant={selectedArea === area ? "contained" : "outlined"}
                  sx={{ margin: '0.5rem' }}
                >
                  {area}
                </Button>
              ))}
            </div>
            {selectedArea && (
              <div className="selected-area-container">
                <h2 className='volunteering-in'>התנדבות ב{selectedArea}</h2>
                <Grid2 container spacing={3}>
              {listLocations.map(location => ( // שימוש במיקומים המסוננים לרשימה
                <Grid2 item xs={12} sm={6} md={4} key={location._id}>
                      <Card className="location-card">
                        {location.imageUrl && (
                                 <CardMedia 
                                 className='volunteering-image'
                                 component="img"
                                 style={{
                                   objectFit: 'cover',
                                   opacity: imagesLoaded[location._id] ? 1 : 0,
                                   transition: 'opacity 0.1s ease-in-out'
                                 }} 
                                 image={`http://localhost:3003${location.imageUrl}`}
                                 alt={location.farmName || 'תמונת ההתנדבות'}
                                 onLoad={() => {
                                   setImagesLoaded(prev => ({
                                     ...prev,
                                     [location._id]: true
                                   }));
                                 }}
                                 loading="lazy"
                                 onError={(e) => {
                                   console.error("Error loading image:", e);
                                   setImagesLoaded(prev => ({
                                     ...prev,
                                     [location._id]: true
                                   }));
                                 }}
                               />
                        )}
                        <CardContent className="location-content">
                          <Typography className="location-description">
                            {location.description}
                          </Typography>
                          <Typography className="location-name">
                            {location.name}
                          </Typography>
                          <VolunteerInfoSnippet2 location={location} />
                        </CardContent>
                      </Card>
                    </Grid2>
                  ))}
                </Grid2>
              </div>
            )}
          </div>
          <div class="image-section">
  <div class="row">
    <div class="image-item wide">
      <img src="/HP4.jpg" alt="עבודה חקלאית בשדה" />
    </div>
    <div class="image-item small-wide">
      <img src="/3.png" alt="התנדבות בשטח" />
    </div>
  </div>
  <div class="row">
    <div class="image-item equal-wide">
      <img src="/HP2.avif" alt="התנדבות בשטח" />
    </div>
    <div class="image-item narrow">
      <img src="/HP1.jpg" alt="קהילת המתנדבים שלנו" />
    </div>
    <div class="image-item equal-wide">
      <img src="/HP5.jpg" alt="פעילות קהילתית" />
    </div>
  </div>
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

        </main>
      </div>
    </div>
); };

export default Home;









