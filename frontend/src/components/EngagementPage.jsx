import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import EngagementSidebar from './EngagementSidebar.jsx';
import ActivityCardGrid from './ActivityCardGrid.jsx';
import { Button } from '@mui/material';
import AddActivityModal from './AddActivityModal.jsx'; // Import the modal component

function EngagementPage() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to 'All' or your desired default category
  const [open, setOpen] = useState(false); // State to control modal visibility

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

  // Functions to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            {/* Right-aligned button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1em' }}>
              <Button 
                sx={{ alignItems: "right", border: '1px solid #1876d2' }} 
                onClick={handleOpen}
              >
                + ADD NEW ACTIVITY
              </Button>
            </div>
            <ActivityCardGrid activities={filteredActivities} />
          </div>
        </div>
      </div>

      {/* Render the AddActivityModal component */}
      <AddActivityModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default EngagementPage;
