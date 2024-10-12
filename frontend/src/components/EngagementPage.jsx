import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import EngagementSidebar from './EngagementSidebar.jsx';
import ActivityCardGrid from './ActivityCardGrid.jsx';

function EngagementPage() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to 'All' or your desired default category

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/engagement/getAllActivities');
        console.log('Response status:', response.status);
        const data = await response.json();
        setActivities(data);
        setFilteredActivities(data);  // Initially show all activities
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredActivities(activities); // Show all activities
    } else {
      const filtered = activities.filter(activity => activity.category === category); // Adjust category matching
      setFilteredActivities(filtered);
    }
  };

  return (
    <div>
      <div style={{ padding: '2em' }}>
        <h1>ENGAGEMENT</h1>
        <p>Take a break, do an activity!</p>
        
        {/* Flexbox container for the sidebar and activity grid */}
        <div style={{ display: 'flex', gap: '2em' }}>
          {/* Sidebar on the left */}
          <div style={{ flex: '0 0 250px', maxWidth: '250px' }}>
            <EngagementSidebar onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
          </div>

          {/* Activity grid on the right */}
          <div style={{ flex: '1' }}>
            <ActivityCardGrid activities={filteredActivities} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngagementPage;
