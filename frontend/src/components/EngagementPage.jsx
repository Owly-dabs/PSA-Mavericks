import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import EngagementSidebar from './EngagementSidebar.jsx';
import ActivityCardGrid from './ActivityCardGrid.jsx';
import { Button, TextField, InputAdornment } from '@mui/material'; // Import InputAdornment and Icon for the search icon
import SearchIcon from '@mui/icons-material/Search'; // Import the SearchIcon
import AddActivityModal from './AddActivityModal.jsx'; // Import the modal component

function EngagementPage() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to 'All' or your desired default category
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search term
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

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter activities based on the search term
    const searchResults = activities.filter((activity) =>
      activity.title.toLowerCase().includes(value.toLowerCase()) || // Search by title
      activity.category.toLowerCase().includes(value.toLowerCase()) // Or category
    );
    setFilteredActivities(searchResults);
  };

  // Functions to open and close the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div style={{ padding: '2em' }}>
        <h1>ENGAGEMENT</h1>
        <p>Take a break, do an activity!</p>

        {/* Flexbox container for the sidebar and main content */}
        <div style={{ display: 'flex', gap: '2em' }}>
          {/* Sidebar on the left */}
          <div style={{ flex: '0 0 250px', maxWidth: '250px' }}>
            <EngagementSidebar onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory} />
          </div>

          {/* Main content section (Right section with search bar and button) */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            {/* Search bar and add activity button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
              {/* Search bar */}
              <TextField
                placeholder="Search"  // Use placeholder instead of label
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: '300px' }} // Adjust the width as necessary
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Add new activity button */}
              <Button 
                sx={{ alignItems: "right", border: '1px solid #1876d2' }} 
                onClick={handleOpen}
              >
                + ADD NEW ACTIVITY
              </Button>
            </div>

            {/* Scrollable ActivityGrid */}
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <ActivityCardGrid activities={filteredActivities} />
            </div>
          </div>
        </div>
      </div>

      {/* Render the AddActivityModal component */}
      <AddActivityModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default EngagementPage;
