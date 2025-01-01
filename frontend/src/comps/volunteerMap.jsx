import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import VolunteerInfoSnippet2 from './volunteerInfoSnippet2';
import '../comps/VolunteerMapSection.css';
import { Icon } from 'leaflet';
const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  React.useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 0.5
    });
  }, [map, center, zoom]);

  map.on('popupclose', () => {
    map.setView(center, zoom, {
      animate: true,
      duration: 0.5
    });
  });

  return null;
};

const VolunteerMap = ({ locations, onLocationSelected }) => {
  const [ setSelectedLocation] = useState(null);
  
  const originalCenter = [31, 35];


  const getMinZoom = () => {
    if (window.innerWidth <= 320) {
      return 6.5;
    } else if (window.innerWidth <= 375) {
      return 6.8;
    } else if (window.innerWidth <= 413) {
      return 7.0;
    } else if (window.innerWidth <= 480) {
      return 7.0;
    } else {
      return 7.2; // המינימום זום המקורי למסכים גדולים
    }
  };
  
  // פונקציה שמחזירה את רמת הזום המתאימה לגודל המסך
  const getResponsiveZoom = () => {
    if (window.innerWidth <= 320) {
      return 6.5;  // זום אאוט יותר למסכים קטנים מאוד
    } else if (window.innerWidth <= 375) {
      return 6.8;
    } else if (window.innerWidth <= 413) {
      return 7.0;
    } else if (window.innerWidth <= 480) {
      return 6.5;
    } else {
      return 7.49999;  // הזום המקורי למסכים גדולים
    }
  };

  const [currentZoom, setCurrentZoom] = useState(getResponsiveZoom());
  const [minZoom, setMinZoom] = useState(getMinZoom());

  const israelBounds = [
    [29.0, 33.8],
    [34.0, 36.2]
  ];

  const customIcon = new Icon({
    iconUrl: '/location.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    onLocationSelected(location);
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  };

  const mapStyle = {
    height: '75vh',
    width: '102%',
    borderRadius: '2px',
    direction: 'rtl',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  };

  const getResponsiveStyle = () => {
    const baseStyle = {
      ...mapStyle,
      marginLeft: 'auto',
      marginRight: 'auto',
    };

    if (window.innerWidth <= 320) {
      return { ...baseStyle, height: '75vh', width: '55%' };
    } else if (window.innerWidth <= 375) {
      return { ...baseStyle, height: '80vh', width: '55%' };
    } else if (window.innerWidth <= 413) {
      return { ...baseStyle, height: '65vh', width: '55%' };
    } else if (window.innerWidth <= 480) {
      return { ...baseStyle, height: '68vh', width: '64%' };
    } else if (window.innerWidth <= 600) {
      return { ...baseStyle, height: '70vh', width: '100%' };
    } else if (window.innerWidth <= 767) {
      return { ...baseStyle, height: '70vh', width: '80%' };
    } else if (window.innerWidth <= 900) {
      return { ...baseStyle, width: '60%' };
    } else if (window.innerWidth <= 1123) {
      return { ...baseStyle, width: '48%' };

  } else if (window.innerWidth >= 2560) {
    return { ...baseStyle, height: '48vh', width: '90%' };
  
} else if (window.innerWidth >= 1921) {
  return { ...baseStyle, height: '53vh', width: '80%' };
}
    return { ...baseStyle, height: '70vh', width: '102%' };
  };

  const [responsiveStyle, setResponsiveStyle] = useState(getResponsiveStyle());

  // עדכון הסגנון והזום בעת שינוי גודל החלון
  React.useEffect(() => {
    const handleResize = () => {
      setResponsiveStyle(getResponsiveStyle());
      setCurrentZoom(getResponsiveZoom());
      setMinZoom(getMinZoom());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={containerStyle}>
    <MapContainer
      center={originalCenter}
      zoom={currentZoom}
      style={responsiveStyle}
      maxBounds={israelBounds}
      minZoom={minZoom}  // שימוש בזום המינימלי הדינמי
      maxZoom={13}
      zoomAnimation={true}
      smoothWheelZoom={true}
      boundsOptions={{ padding: [30, 30] }}
      maxBoundsViscosity={1.0}
    >
      <MapController center={originalCenter} zoom={currentZoom} />
      
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
        language="he"
        bounds={israelBounds}
      />

      {locations.map((location) => (
        <Marker
          key={location._id}
          position={[location.lat, location.lng]}
          icon={customIcon}
          eventHandlers={{
            click: () => handleMarkerClick(location),
          }}
        >
          <Popup
            className="custom-popup"
            maxWidth={200}
            autoPan={true}
            keepInView={true}
          >
            <div
              dir="rtl"
              style={{
                width: '100%',
                maxHeight: '200px',
                overflowY: 'auto',
                textAlign: 'center',
                fontFamily: 'Arial Hebrew, Arial, sans-serif',
                fontSize: '1rem',
                padding: '8px'
              }}
            >
              <VolunteerInfoSnippet2 location={location} isFromMap={true} />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
};

export default VolunteerMap;