import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CareerPathwayTimeline from './CareerPathwayTimeline.jsx';
import CoursesCard from './CoursesCard.jsx';
import CoursesCarousell from './CoursesCarousell.jsx';
import { projectManagementCourses } from './mock.jsx';
import UserIcon from '../assets/user.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function CareerPage() {
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [relevantCourses, setRelevantCourses] = useState([]);
  const [userJob, setUserJob] = useState("");
  const [careerPathway, setCareerPathway] = useState([]);

  const getRandomCourse = () => {
    const randomIndex = Math.floor(Math.random() * projectManagementCourses.length);
    return projectManagementCourses[randomIndex];
  };

  useEffect(() => {
      const userId = sessionStorage.getItem('userId');

      const fetchUserInfo = async () => {
          try {
              const UIresponse = await fetch(`${process.env.BACKEND_URL}/api/auth/getUserInfo/${userId}`);
              if (!UIresponse.ok) {
                  throw new Error('Failed to fetch user info');
              }
              const UIdata = await UIresponse.json();
              const jobId = UIdata.currentJob;
              const jobCategory = UIdata.jobCategory;

              const JNresponse = await fetch(`${process.env.BACKEND_URL}/api/career/getJobName/${jobId}`);
              if (!JNresponse.ok) {
                  throw new Error('Failed to fetch job name');
              }
              const JNdata = await JNresponse.json();
              setUserJob(JNdata.jobName);
              console.log(userJob)

              const response = await fetch(`${process.env.BACKEND_URL}/api/career/getJobPathway/${jobCategory}`);
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

      fetchUserInfo();
  }, []);

  const randomCourse = getRandomCourse();

  return (
    <Box sx={{ padding: '2em' }}>
      <Typography variant='h2' sx={{ display: 'flex', padding: '5px', fontWeight: 'semi-bold' }}>CAREER 🌱</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2em', padding: '2em', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '20px' }}>
        <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center' }}>Your current role is: Assistant Project Manager</Typography>
        <CareerPathwayTimeline sx={{ display: 'flex', justifyContent: 'right' }} />
      </Box>

      <Typography variant="h5" sx={{ marginTop: '1em', textAlign: 'center', padding: '0.5em' }}>Recommended Course</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '2em', padding: '2em', background: 'rgba(255, 255, 255, 0.7)', borderRadius: '20px' }}>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          <img
            src={randomCourse.image}
            style={{
              width: '50vw',
              height: '40vh',
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
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            mx: '2em',
            paddingTop: '2em',
          }}>
            <Typography variant="h5" sx={{ marginBottom: '0.5em' }}>{randomCourse.title}</Typography>
            <Typography variant="body1" sx={{ marginBottom: '1em' }}>{randomCourse.description}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
              <img
                src={UserIcon}
                style={{
                  width: '1.2em',
                  height: '1.2em',
                  marginRight: '0.5em',
                }}
                alt="User icon"
              />
              <Typography variant="body1">{randomCourse.instructor}</Typography>
            </Box>

            {/* Use Link to navigate to individual course page */}
            <Button
              variant="outlined"
              size="small"
              sx={{ width: '100%', marginTop: '1em' }}
              component={Link}
              to={`/courses/${randomCourse.id}`} // Navigate to course page with course ID
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center', padding: '0.5em' }}>
        Other relevant courses
      </Typography>
      <Box sx={{ px: '2em', paddingBottom: '5em' }}>
        <CoursesCarousell />
      </Box>
    </Box>
  );
}

export default CareerPage;
