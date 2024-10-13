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

export default function MediaCard({ title, date, time, id, image, vacancies }) {
  const navigate = useNavigate(); // Use the hook to navigate

  // Function to format the date in dd MMM yyyy format
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString); // Parse the date string into a Date object
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(dateObj);
  };

  // Function to format time to hh:mm format
  const formatTime = (timeString) => {
    return dayjs(timeString).format('hh:mm A'); // Use dayjs to format time as hh:mm AM/PM
  };

  const handleReadMore = () => {
    navigate(`/engagement/${id}`); // Navigate to the individual activity page
  };

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      maxWidth: 345,
      boxShadow: 3,
      borderRadius: '8px',
    }}>
      {/* Display activity image or a default image */}
      <CardMedia
        sx={{ 
          height: 140, 
          objectFit: 'cover',
        }}
        image={image || "/static/images/cards/default-image.jpg"} // Fallback to a default image if no image is provided
        title={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <img src={CalendarIcon} style={{ display: 'flex', marginRight: '4px', width: '0.9em' }} alt="calendar icon" />
          <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }}>
            {formatDate(date)} {/* Use the formatDate function */}
          </Typography>

          <img src={ClockIcon} style={{ display: 'flex', marginRight: '4px', width: '0.9em' }} alt="clock icon" />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {formatTime(time)} {/* Use the formatTime function */}
          </Typography>

          <img src={VacanciesIcon} style={{ display: 'flex', marginLeft:'8px',marginRight: '6px',  width: '0.9em' }} alt="vacancies icon" />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {vacancies}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small" onClick={handleReadMore}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
