import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import ActivityCard from './ActivityCard.jsx';
import ActivityCardGrid from './ActivityCardGrid.jsx';


function EngagementPage() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchActivities = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/engagement/getAllActivities'); // Ensure the URL is correct
          console.log('Response status:', response.status); // Log status to check if it's successful
          const data = await response.json(); // Parse JSON from the response
          setActivities(data);  // Set fetched activities in the state
          console.log(activities)
        } catch (error) {
          console.error('Error fetching activities:', error);
        }
    };

    fetchActivities();
  }, []);   
  return (
    <div >
      <Navbar />
      <div style={{padding:'2em'}}>
        <h1>ENGAGEMENT</h1>
        <p>Take a break, do an activity!</p>
    
        <ActivityCardGrid activities={activities}/>

      </div>

    </div>
  );
}

export default EngagementPage;