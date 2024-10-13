// src/components/HomePage.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import CareerPathwayTimeline from './CareerPathwayTimeline.jsx';
import CoursesCard from './CoursesCard.jsx';
import CoursesCarousell from './CoursesCarousell.jsx';

function CareerPage() {
    return (
      <Box sx={{ padding: '2em' }}>
        <Typography variant='h2' sx={{ display: 'flex', padding: '5px', fontWeight: 'semi-bold' }}>CAREER 🌱</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2em', paddingBottom: '2em' }}>
          <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center' }}>Your current role is: ___</Typography>
          <CareerPathwayTimeline sx={{ display: 'flex', justifyContent: 'right' }} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2em', paddingBottom: '2em' }}>
          <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center' }}>Recommended Course</Typography>

          {/* Centering the CoursesCard and giving it a specific width */}
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CoursesCard sx={{ width: '100%', maxWidth: '600px', textAlign: 'center' }} />
          </Box>
        </Box>

        <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'left' }}>
          Other relevant courses:
        </Typography>
        <Box sx={{ px: '2em' }}>
          <CoursesCarousell />
        </Box>
      </Box>
    );
}

export default CareerPage;
