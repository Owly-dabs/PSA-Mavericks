// src/components/LoginPage.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(response.body);
      }

      const data = await response.json();

      // Assuming the response contains a token
      if (data.token) {
        // Store the token (e.g., in localStorage or state)
        localStorage.setItem('token', data.token);

        // Call the onLogin function to update the app state
        onLogin();
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, mx: 'auto', maxWidth: 400 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
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
  );
}

export default LoginPage;