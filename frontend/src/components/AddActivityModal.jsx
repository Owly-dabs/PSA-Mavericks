import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon

function AddActivityModal({ open, handleClose }) {
  const [category, setCategory] = useState(''); // State to manage the selected category

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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
          position: 'relative' // Set position relative to position the close button
        }}
      >
        {/* Close Button in top-right corner */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500], // Grey close button
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography id="add-activity-modal-title" variant="h6" component="h2" >
          Add New Activity
        </Typography>
        <Typography id="add-activity-modal-description" sx={{ mt: 2 }}>
          Fill in the details of the new activity. Once approved, your activity will be visible on the page.
        </Typography>

        {/* Form for new activity */}
        <TextField fullWidth label="Activity Title" sx={{ mt: 2 }} />

        {/* Activity Category Dropdown */}
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

        <TextField fullWidth label="Image URL" sx={{ mt: 1 }} />
        <TextField fullWidth label="Date" sx={{ mt: 1 }} />
        <TextField fullWidth label="Time" sx={{ mt: 1 }} />
        <TextField fullWidth label="Vacancies" sx={{ mt: 1 }} />
        <TextField fullWidth label="Description" multiline rows={3} sx={{ mt: 1 }} />

        <Button onClick={handleClose} sx={{ mt: 2, backgroundColor: '#1876d2', color: 'white' }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default AddActivityModal;
