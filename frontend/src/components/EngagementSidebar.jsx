import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function GroupOrientation({ onCategoryChange, selectedCategory }) {
  // Define categories, you can expand this array with actual categories
  const categories = ['All', 'Sports', 'Arts & Crafts'];

  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      {/* ButtonGroup with dynamic buttons for categories */}
      <ButtonGroup orientation="vertical" aria-label="Vertical button group" style={{ width: '12em',backgroundColor:'rgba(255, 255, 255, 0.7)' }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === selectedCategory ? 'contained' : 'outlined'}
            onClick={() => onCategoryChange(category)}
            style={{
              textAlign: 'left', 
              paddingLeft: '1em',
              justifyContent: 'flex-start', // Align text to left
            }}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
