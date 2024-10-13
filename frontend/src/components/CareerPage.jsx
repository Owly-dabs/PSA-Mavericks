// src/components/HomePage.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CareerPathwayTimeline from './CareerPathwayTimeline.jsx';
import CoursesCard from './CoursesCard.jsx';
import CoursesCarousell from './CoursesCarousell.jsx';

function CareerPage() {
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [relevantCourses, setRelevantCourses] = useState([]);

  useEffect(() => {
      // Fetch featured course
      const fetchFeaturedCourse = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/courses/featured');
              if (!response.ok) {
                  throw new Error('Failed to fetch featured course');
              }
              const data = await response.json();
              setFeaturedCourse(data);
          } catch (error) {
              console.error("Error fetching featured course:", error);
          }
      };

      // Fetch other relevant courses
      const fetchRelevantCourses = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/courses/relevant');
              if (!response.ok) {
                  throw new Error('Failed to fetch relevant courses');
              }
              const data = await response.json();
              setRelevantCourses(data);
          } catch (error) {
              console.error("Error fetching relevant courses:", error);
          }
      };

      fetchFeaturedCourse();
      fetchRelevantCourses();
  }, []);

    return (
      <Box sx={{ padding: '2em' }}>
        <Typography variant='h2' sx={{ display: 'flex', padding: '5px', fontWeight: 'semi-bold' }}>CAREER 🌱</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2em', padding: '2em', background:'rgba(255, 255, 255, 0.7)', borderRadius:'20px' }}>
          <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center' }}>Your current role is: ___</Typography>
          <CareerPathwayTimeline sx={{ display: 'flex', justifyContent: 'right' }} />
        </Box>

        <Typography variant="h5" sx={{ marginTop: '1em', textAlign: 'center', padding: '0.5em' }}>Recommended Course</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin:'2em',padding: '2em', background:'rgba(255, 255, 255, 0.7)', borderRadius:'20px'}}>
          

          {/* Centering the CoursesCard and giving it a specific width */}
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          <img
            src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            style={{
              width: '50vw', // Set width to fill its container
              height: '40vh', // Define a fixed height
              objectFit: 'cover',
              flex: '0 0 auto',
              padding: '2em',
              borderRadius: '20px'
            }}
            alt="Course"
          />

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start', // Align the content at the top
            alignItems: 'flex-start', // Align items horizontally at the start (left-aligned)
            width: '100%',
            mx:'2em',
            paddingTop:'2em',
            
          }}>
            <Typography variant="h5" sx={{ marginBottom: '0.5em' }}>Course Title</Typography>
            <Typography variant="body1" sx={{ marginBottom: '1em' }}>Course Description</Typography>
            <Button size="small" sx={{ width: '100%', marginTop: '1em' }}>Learn More</Button>
          </Box>
          </Box>
        </Box>

        <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center', padding:'0.5em' }}>
          Other relevant courses
        </Typography>
        <Box sx={{ px: '2em', paddingBottom:'5em' }}>
          <CoursesCarousell />
        </Box>
      </Box>
    );
}

export default CareerPage;
