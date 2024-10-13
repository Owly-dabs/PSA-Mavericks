import * as React from 'react';
import Grid from '@mui/material/Grid';
import ActivityCard from './ActivityCard.jsx';  // Import your existing MediaCard component

export default function ActivityGrid({ activities }) {
  // Sort activities by date first, and then by time
  const sortedActivities = activities.sort((a, b) => {
    // Sort by date first
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA !== dateB) return dateA - dateB;

    // If dates are the same, sort by time
    const timeA = a.time.split(':').join(''); // Remove ':' for correct comparison
    const timeB = b.time.split(':').join('');
    return timeA - timeB;
  });

  return (
    <Grid container spacing={2} sx={{ padding: 1 }}>
      {sortedActivities.map((activity) => (
        <Grid item xs={12} sm={6} md={3} key={activity._id}>
          <ActivityCard 
            title={activity.title}
            date={activity.date}
            time={activity.time}
            id={activity._id}
            image={activity.image} // Pass the image here
            vacancies={activity.vacancies}
          />
        </Grid>
      ))}
    </Grid>
  );
}
