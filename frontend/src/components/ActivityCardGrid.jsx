import * as React from 'react';
import Grid from '@mui/material/Grid';
import ActivityCard from './ActivityCard.jsx';  // Import your existing MediaCard component

export default function ActivityGrid({ activities }) {
  return (
    <Grid container spacing={2} sx={{ padding: 1 }}>
      {activities.map((activity) => (
        <Grid item xs={12} sm={6} md={3} key={activity._id}>
          <ActivityCard 
            title={activity.title}
            date={activity.date}
            time={activity.time}
            id={activity._id}
            image={activity.image} // Pass the image here
          />
        </Grid>
      ))}
    </Grid>
  );
}
