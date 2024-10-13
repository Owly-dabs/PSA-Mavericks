import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        py: 4,

      }}
    >

      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
