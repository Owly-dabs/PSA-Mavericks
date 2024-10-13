import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import the DatePicker
import { TimePicker } from '@mui/x-date-pickers/TimePicker'; // Import the TimePicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Day.js adapter for the date picker

function AddActivityModal({ open, handleClose }) {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState(null); // Date should be initialized as null
  const [time, setTime] = useState(null); // Time should be initialized as null
  const [vacancies, setVacancies] = useState('');
  const [details, setDetails] = useState('');

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const creator = sessionStorage.getItem('userId'); // Assuming the creator's ID is stored in sessionStorage
      const activityData = {
        title,
        details,
        image,
        date: date ? date.toDate() : null, // Convert Dayjs date to native JS Date
        time,
        vacancies,
        creator,
        category,
      };
  
      const response = await fetch('http://localhost:3000/api/engagement/createActivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData), // Send the activity data to the backend
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Activity created successfully!');
        handleClose(); // Close the modal
        window.location.reload(); // Refresh the page to reflect the new activity
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };
  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-activity-modal-title"
      aria-describedby="add-activity-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography id="add-activity-modal-title" variant="h6" component="h2">
          Add New Activity
        </Typography>
        <Typography id="add-activity-modal-description" sx={{ mt: 2 }}>
          Fill in the details of the new activity. Once approved, your activity will be visible on the page.
        </Typography>

        {/* Form Fields */}
        <TextField fullWidth label="Activity Title" sx={{ mt: 2 }} value={title} onChange={(e) => setTitle(e.target.value)} />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="activity-category-label">Activity Category</InputLabel>
          <Select
            labelId="activity-category-label"
            id="activity-category"
            value={category}
            label="Activity Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Arts and Crafts">Arts and Crafts</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth label="Image URL" sx={{ mt: 2 }} value={image} onChange={(e) => setImage(e.target.value)} />

        {/* Grid for Date and Time Pickers */}
        <Grid container spacing={2} sx={{ mt: 0.2 }}>
          <Grid item xs={6}>
            {/* DatePicker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            {/* TimePicker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Time"
                value={time}
                onChange={(newTime) => setTime(newTime)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <TextField fullWidth label="Vacancies" sx={{ mt: 2 }} value={vacancies} onChange={(e) => setVacancies(e.target.value)} />
        <TextField fullWidth label="Description" multiline rows={3} sx={{ mt: 2 }} value={details} onChange={(e) => setDetails(e.target.value)} />

        <Button
          onClick={handleSubmit} // Call handleSubmit when clicked
          sx={{ mt: 2, backgroundColor: '#1876d2', color: 'white' }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default AddActivityModal;
