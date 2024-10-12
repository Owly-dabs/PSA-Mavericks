// src/components/HomePage.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import Navbar from './Navbar.jsx'

function HomePage() {
  return (
    <div>
      <Navbar/>
    
      <Box style={{ mt: 8, mx: 'auto', maxWidth: 600 }}>

        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Home Page!
        </Typography>
        <Typography variant="body1">
          This is a simple home page created with Material UI.
        </Typography>
      </Box>
    </div>

  );
}

export default HomePage;