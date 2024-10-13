import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import backgroundImage from '../assets/background.png'; 
import PSALogo from '../assets/PSALogo.png'; 

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // State to store error message
  const [openSnackbar, setOpenSnackbar] = useState(false);  // State to control Snackbar visibility

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log(data);

      // Store the userId in sessionStorage
      sessionStorage.setItem('userId', data.user._id);
      
      const storedUserId = sessionStorage.getItem('userId');
      console.log('Stored userId:', storedUserId);

      if (storedUserId) {
        console.log('User ID successfully stored:', storedUserId);
      } else {
        console.error('Failed to store user ID');
      }

      // Call the onLogin function to update the app state (like redirecting or showing the user as logged in)
      onLogin();

      // Reset the error state
      setErrorMessage('');
      setOpenSnackbar(false);

    } catch (error) {
      console.error('There was an error!', error);

      // Set the error message and open the Snackbar
      setErrorMessage(error.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);  // Close the Snackbar
  };

  return (
    <div 
      className="LoginPage"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`, // Add your image URL here
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent image repetition
      }}
    >
      <img
        src={PSALogo}
        alt="Logo" 
        style={{
          display: 'block',
          margin: '0 auto',
          maxWidth: '15em',
          height: 'auto',
          justifyItems: 'left',
        }}
      />

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, mb: 20, mx: 'auto', maxWidth: 400, backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '2em', borderRadius: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Log in ✨
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>

      {/* Snackbar for error messages */}
      <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={errorMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ 
            backgroundColor: '#f2543f',  // Ensure the Snackbar itself is red
            '.MuiSnackbarContent-root': {
              backgroundColor: '#f2543f',  // Specifically style the Snackbar content
              color: 'white',          // Ensure the text inside is white
            }
          }}
        />
    </div>
  );
}

export default LoginPage;
