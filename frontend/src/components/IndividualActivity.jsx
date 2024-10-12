// src/components/IndividualActivity.jsx
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import placeholderimg from '../assets/background.png';

export default function IndividualActivity() {
  const { id } = useParams(); // Get the activity ID from the URL
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    // Fetch the activity details using the ID from the URL
    const fetchActivity = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/engagement/getActivity/${id}`);
        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    fetchActivity();
  }, [id]);

  if (!activity) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ padding: '2em', display: 'flex', gap: '2em', alignItems: 'flex-start' }}>
      {/* Image section */}
      <img src={placeholderimg} style={{ width: '50vw',    // Set the width to 50% of the viewport width
          height: 'auto',   // Maintain aspect ratio
          flex: '0 0 auto', margin:'2em' }} alt="Activity" /> 
      
      {/* Text section */}
      <Box sx={{ flex: '1' }}>
        <h1>{activity.title}</h1>
        <p>Date: {activity.date}</p>
        <p>Time: {activity.time}</p>
        <p>Details: {activity.details}</p>
        <p>Vacancies: {activity.vacancies}</p>
        <Button variant="outlined" style={{ width: '35vw'}}>Register</Button>
      </Box>
    </Box>
  );
}
