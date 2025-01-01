import { useState } from 'react';
import React from 'react';
import Counter from './comps/header.jsx';
import Home from './pages/HomePage.jsx';
import FarmerRegistration from './pages/FarmersReg.jsx';
import VolunteerRegProcess from './pages/volunteerProcessPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import ScrollToTop from './comps/scrollToTop.jsx';
import ScrollToTopButton from './comps/scrollTopButton.jsx';
import './comps/scrollTopButton.css';
import { VolunteerFAQ } from './pages/VolunteerFAQ.jsx';
import { FarmersFAQ } from './pages/FarmerFAQ.jsx';
import './comps/FAQ.css';


import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <ScrollToTop/>
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path='/volunteer-page' element={<VolunteerRegProcess/>}/>
          <Route path='/farmers-join' element={<FarmerRegistration/>}/>
          <Route path="/volunteer-faq" element={<VolunteerFAQ />} />
          <Route path="/farmers-faq" element={<FarmersFAQ />} />
        </Routes>
      </Router>
      <ScrollToTopButton />
    </div>
  );
}

export default App;

