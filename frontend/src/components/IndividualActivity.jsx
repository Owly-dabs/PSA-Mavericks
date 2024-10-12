// src/components/IndividualActivity.jsx
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <Box sx={{padding:'2em'}}>
      <h1>{activity.title}</h1>
      <p>Date: {activity.date}</p>
      <p>Time: {activity.time}</p>
      <p>Details: {activity.details}</p>
      <p>Vacancies: {activity.vacancies}</p>
      
    </Box>
  );
}
