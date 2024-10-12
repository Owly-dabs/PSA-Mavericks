import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserIcon from '../assets/user.png'; 
import ClockIcon from '../assets/clock.png'; 
import CalendarIcon from '../assets/calendar.png'; 

export default function MediaCard({title, creator, date, time}) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Box display="flex" alignItems="center">
            

          <img src={CalendarIcon} style={{
                display: 'flex', 
                marginRight: '6px',  
                width:'0.9em'
            }}></img>
          <Typography variant="body2" sx={{ color: 'text.secondary', mr: 2  }}>
            {date}
          </Typography>

          <img src={ClockIcon} style={{
                display: 'flex', 
                marginRight: '6px', 
                width:'0.9em'
            }}></img>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {time}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
