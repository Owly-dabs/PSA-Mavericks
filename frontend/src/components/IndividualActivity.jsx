import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

export default function IndividualActivity() {
  const { id } = useParams(); // Get the activity ID from the URL
  const [activity, setActivity] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // State to track registration status

  useEffect(() => {
    // Fetch the activity details using the ID from the URL
    const fetchActivity = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/engagement/getActivity/${id}`);
        const data = await response.json();
        setActivity(data);
        
        // Check if the user is already registered for the activity
        const userId = sessionStorage.getItem('userId');
        if (userId && data.signedUpUsers.some(user => user._id === userId)) {
          setIsRegistered(true); // Mark as registered if user ID exists in signedUpUsers
        }
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    fetchActivity();
  }, [id]);

  // Function to handle the registration
  const handleRegister = async () => {
    try {
      const userId = sessionStorage.getItem('userId'); // Retrieve the user ID from sessionStorage

      if (!userId) {
        alert('You must be logged in to register for an activity.');
        return;
      }

      const response = await fetch(`${process.env.BACKEND_URL}/api/engagement/${id}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Send the user ID in the request body
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signed up successfully!');
        setActivity(data.activity); // Optionally update the activity after signing up
        setIsRegistered(true); // Update the button state to show "REGISTERED"
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error signing up for activity:', error);
    }
  };

  // Function to handle the withdrawal
  const handleWithdraw = async () => {
    try {
      const userId = sessionStorage.getItem('userId'); // Retrieve the user ID from sessionStorage

      if (!userId) {
        alert('You must be logged in to withdraw from an activity.');
        return;
      }

      const response = await fetch(`${process.env.BACKEND_URL}/api/engagement/${id}/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Send the user ID in the request body
      });

      const data = await response.json();

      if (response.ok) {
        alert('Withdrawn from activity successfully!');
        setActivity(data.activity); // Optionally update the activity after withdrawal
        setIsRegistered(false); // Update the button state to show "Register"
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error withdrawing from activity:', error);
    }
  };

  if (!activity) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ padding: '2em', paddingBottom:'12em', display: 'flex', gap: '2em', alignItems: 'flex-start' }}>
      {/* Image section */}
      <img
        src={activity.image}
        style={{
          width: '50vw', // Set the width to 50% of the viewport width
          height: 'auto', // Maintain aspect ratio
          flex: '0 0 auto',
          margin: '2em',
        }}
        alt="Activity"
      />

      {/* Text section */}
      <Box sx={{ flex: '1' }}>
        <h1>{activity.title}</h1>
        <p>Date: {activity.date}</p>
        <p>Time: {activity.time}</p>
        <p>Details: {activity.details}</p>
        <p>Vacancies: {activity.vacancies}</p>
        {console.log(activity)}
        {/* Conditionally render either Register or Withdraw button */}
        {!isRegistered ? (
          <Button
            variant="outlined"
            style={{
              width: '35vw',
              borderColor: '#1876d2',
              color: '#1876d2',
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        ) : (
          <Button
            variant="outlined"
            style={{
              width: '35vw',
              borderColor: 'red',
              color: 'red',
            }}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        )}
      </Box>
    </Box>
  );
}
