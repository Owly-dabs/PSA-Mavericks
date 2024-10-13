// src/components/HomePage.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import Navbar from './Navbar.jsx'
import CareerPathwayTimeline from './CareerPathwayTimeline.jsx';

function CareerPage() {
    return (
      <Box sx={{padding:'2em'}}>
        <h1>CAREER</h1>
        <p>Your current role is: ___</p>
        <CareerPathwayTimeline/>
      </Box>
  
    );
  }
  
  export default CareerPage;