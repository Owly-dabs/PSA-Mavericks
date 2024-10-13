import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ClockIcon from '../assets/clock.png'; 
import CalendarIcon from '../assets/calendar.png'; 
import VacanciesIcon from '../assets/vacancies.png'; 
import dayjs from 'dayjs'; // Import dayjs for date formatting

export default function CourseCard({ title, date, time, id, image, vacancies }) {
  const navigate = useNavigate(); // Use the hook to navigate

  const handleLearnMore = () => {
    navigate(`/courses/${id}`); // Navigate to the individual course page
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Display course image or a default image */}
      <CardMedia
        sx={{ height: 140 }}
        image={image || "/static/images/cards/default-image.jpg"} // Fallback to a default image if no image is provided
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Course <title></title>
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
        
          <Typography variant="body2" sx={{ color: 'text.secondary', mr: 2 }}>
            short description
          </Typography>


        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLearnMore}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
