import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CoursesCard({
  title,
  description,
  image,
  id,
  date,
  time,
  vacancies,
}) {
  const navigate = useNavigate(); // Use the hook to navigate

  const handleLearnMore = () => {
    // Pass course details via state when navigating
    navigate(`/courses/${id}`, {
      state: { title, description, image, date, time, vacancies }
    });
  };

  return (
    <Card sx={{ maxWidth: 320, display: 'flex', flexDirection: 'column', height: '350px' }}>
      {/* Display course image or a default image */}
      <CardMedia
        sx={{
          height: 180,  // Fixed height for the image section
          objectFit: 'cover',  // Ensure image covers the area without stretching
        }}
        image={image || '/static/images/cards/default-image.jpg'} // Fallback to a default image if no image is provided
        title={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // Truncate text after 2 lines
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Add ellipsis (...) at the end
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" onClick={handleLearnMore}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
