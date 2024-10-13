// src/components/HomePage.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import Navbar from './Navbar.jsx';
import CareerPathwayTimeline from './CareerPathwayTimeline.jsx';
import CoursesCard from './CoursesCard.jsx';

function CareerPage() {
    return (
      <Box sx={{ padding: '2em' }}>
        <h1>CAREER</h1>

        <Box sx={{ display: 'flex', marginTop: '2em' }}>
          <Box sx={{ padding: '2em', display: 'flex', justifyContent: 'left', flexDirection: 'column' }}>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'left' }}>Your current role is: ___</Typography>
                <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'left' }}>Current track: ___</Typography>
            </Box>
            <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'left' }}>
              Recommended courses for you:
            </Typography>


         
            <CoursesCard />

          </Box>
          <Box sx={{ flexGrow: 1 }} />  {/* This takes up the remaining space */}
          <CareerPathwayTimeline sx={{ display: 'flex', justifyContent: 'right' }} />
        </Box>
      </Box>
    );
}

export default CareerPage;
