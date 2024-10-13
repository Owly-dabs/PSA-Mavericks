// src/components/HomePage.js
import React, {useState, useEffect} from 'react';
import { Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CareerPathwayTimeline from './CareerPathwayTimeline.jsx';
import CoursesCard from './CoursesCard.jsx';
import CoursesCarousell from './CoursesCarousell.jsx';
import { projectManagementCourses } from './mock.jsx';

function CareerPage() {
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [relevantCourses, setRelevantCourses] = useState([]);
  const [userJob, setUserJob] = useState("");
  const [careerPathway, setCareerPathway] = useState([]);

  // Get a random course from mock data
  const getRandomCourse = () => {
    const randomIndex = Math.floor(Math.random() * projectManagementCourses.length);
    return projectManagementCourses[randomIndex];
  };

  useEffect(() => {
      const userId = sessionStorage.getItem('userId');

      const fetchUserInfo = async () => {
          try {
              const UIresponse = await fetch(`http://localhost:3000/api/auth/getUserInfo/${userId}`);
              if (!UIresponse.ok) {
                  throw new Error('Failed to fetch user info');
              }
              const UIdata = await UIresponse.json();
              const jobId = UIdata.currentJob; // Assuming currentJob is in the response
              const jobCategory = UIdata.jobCategory; // Assuming jobCategory is in the response

              const JNresponse = await fetch(`http://localhost:3000/api/career/getJobName/${jobId}`);
              if (!JNresponse.ok) {
                  throw new Error('Failed to fetch job name');
              }
              const JNdata = await JNresponse.json();
              setUserJob(JNdata.jobName);
              console.log(userJob)

              const response = await fetch(`http://localhost:3000/api/career/getJobPathway/${jobCategory}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch career pathway');
              }
              const data = await response.json();
              setCareerPathway(data);
              console.log(careerPathway);
          } catch (error) {
              console.error("Error fetching user info:", error);
          }
      };

      const fetchFeaturedCourse = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/courses/featured');
              if (!response.ok) {
                  throw new Error('Failed to fetch featured course');
              }
              const data = await response.json();
              setFeaturedCourse(data);
              console.log(featuredCourse);
          } catch (error) {
              console.error("Error fetching featured course:", error);
          }
      };

      const fetchRelevantCourses = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/courses/relevant');
              if (!response.ok) {
                  throw new Error('Failed to fetch relevant courses');
              }
              const data = await response.json();
              setRelevantCourses(data);
              console.log(relevantCourses);
          } catch (error) {
              console.error("Error fetching relevant courses:", error);
          }
      };

      fetchUserInfo();
      // fetchFeaturedCourse();
      // fetchRelevantCourses();
  }, []);

    const randomCourse = getRandomCourse();
    return (
      <Box sx={{ padding: '2em' }}>
        <Typography variant='h2' sx={{ display: 'flex', padding: '5px', fontWeight: 'semi-bold' }}>CAREER 🌱</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2em', padding: '2em', background:'rgba(255, 255, 255, 0.7)', borderRadius:'20px' }}>
          <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center' }}>Your current role is: Assistant Project Manager</Typography>
          <CareerPathwayTimeline sx={{ display: 'flex', justifyContent: 'right' }} />
        </Box>

        <Typography variant="h5" sx={{ marginTop: '1em', textAlign: 'center', padding: '0.5em' }}>Recommended Course</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin:'2em',padding: '2em', background:'rgba(255, 255, 255, 0.7)', borderRadius:'20px'}}>
          

          {/* Centering the CoursesCard and giving it a specific width */}
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          <img
            src={randomCourse.image}
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
            <Typography variant="h5" sx={{ marginBottom: '0.5em' }}>{randomCourse.title}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '1em' }}>{randomCourse.description}</Typography>
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
