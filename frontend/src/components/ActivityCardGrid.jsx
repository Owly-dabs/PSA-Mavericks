import * as React from 'react';
import Grid from '@mui/material/Grid';
import ActivityCard from './ActivityCard.jsx';  // Import your existing MediaCard component

export default function ActivityGrid() {
  // Sample data for the cards (You can replace this with dynamic data)
  const activities = [
    { id: 1, title: "Activity 1", user: "User 1", date: "2024-10-12", time: "10:00 AM" },
    { id: 2, title: "Activity 2", user: "User 2", date: "2024-10-13", time: "12:00 PM" },
    { id: 3, title: "Activity 3", user: "User 3", date: "2024-10-14", time: "02:00 PM" },
    { id: 4, title: "Activity 4", user: "User 4", date: "2024-10-15", time: "04:00 PM" },
    { id: 5, title: "Activity 5", user: "User 5", date: "2024-10-16", time: "06:00 PM" },
    { id: 6, title: "Activity 6", user: "User 6", date: "2024-10-17", time: "08:00 AM" },
    { id: 7, title: "Activity 7", user: "User 7", date: "2024-10-18", time: "09:00 AM" },
    { id: 8, title: "Activity 8", user: "User 8", date: "2024-10-19", time: "10:30 AM" },
    { id: 9, title: "Activity 9", user: "User 9", date: "2024-10-20", time: "12:30 PM" },
  ];

  return (
    <Grid container spacing={2} sx={{ padding: 1 }}>
      {activities.map((activity) => (
        <Grid item xs={12} sm={6} md={3} key={activity.id}>
          <ActivityCard 
          />
        </Grid>
      ))}
    </Grid>
  );
}
