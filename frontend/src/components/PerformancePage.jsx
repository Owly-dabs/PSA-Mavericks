// src/components/PerformancePage.js
import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Carousel from 'react-slick'; // Ensure you have react-slick installed

function PerformancePage() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const userId = sessionStorage.getItem('userId');
    // const feedbacks = [
    //     "Great job on the project! Your dedication really showed.",
    //     "Your teamwork skills are exemplary, keep it up!",
    //     "The presentation was top-notch! You really engaged the audience.",
    // ];

    useEffect(() => {
        const badgeEndpoint = `${process.env.BACKEND_URL}/api/performance/getBadges/${userId}`;
        // console.log(badgeEndpoint)

        fetch(badgeEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAchievements(data["badges"]);
                // console.log(data["badges"]);
            })
            .catch(error => {
                console.error("There was an error fetching the achievements!", error);
            });

        const feedbackEndpoint = `${process.env.BACKEND_URL}/api/performance/${userId}/getFeedback`;
        // console.log(feedbackEndpoint)

        fetch(feedbackEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFeedbacks(data["feedbackList"]);
                // console.log(data["feedbackList"]);
            })
            .catch(error => {
                console.error("There was an error fetching the achievements!", error);
            });
 
    }, [userId]); // Added userId as a dependency

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Box sx={{ padding: '2em' }}>
            <Typography variant='h2' sx={{ display: 'flex', padding: '5px', fontWeight: 'semi-bold', justifyContent:'left' }}>PERFORMANCE 💫</Typography>
            <Typography variant="h5" sx={{ my: '1em', mx: 1, textAlign: 'left' }}>Your Strengths</Typography>
                {/* Display achievements in cards */}
                <Box sx={{backgroundColor:'rgba(255, 255, 255, 0.7)', borderRadius:'20px' }}>
                  <Grid container spacing={1} justifyContent="center" >
                      {achievements.map((achievement, index) => (
                          <Grid item xs={2.5} key={index} textAlign="center">
                            <Card sx={{
                                width: 270, 
                                height: 270, 
                                
                                backgroundColor: 'transparent', 
                                transition: 'transform 0.3s', // Smooth transition for transform
                                boxShadow: 'none', // No shadow by default
                                '&:hover': {
                                    transform: 'scale(1.05)', // Slightly increase size on hover
                                    //boxShadow: '0px 10px 20px rgba(0,0,0,0.2)', // Add shadow on hover
                                },
                            }}>
                                <CardMedia
                                    component="img"
                                    src={`/badges/${achievement.icon}`} // Adjusted to your badges directory
                                    alt={achievement.name}
                                    sx={{
                                        height: 200, // Adjust height
                                        objectFit: 'contain', // Keeps the image's aspect ratio
                                        pt: 2, // Adjust padding
                                        backgroundColor: 'transparent', // Remove background color
                                        borderRadius: '0', // Optional: Remove rounded corners if any
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="body1">{achievement.name}</Typography>
                                </CardContent>
                            </Card>


                          </Grid>
                      ))}
                  </Grid>
                </Box>
                

                {/* Display a carousel of feedback from other employees */}
                <Box sx={{ my: '4em', }}>
                <Typography variant="h5" sx={{ marginBottom: '1em', mx: 1, textAlign: 'left' }}>
                        Feedback
                    </Typography>
                    <Carousel {...carouselSettings}>
                        {feedbacks.map((feedback, index) => (
                            <Box key={index} >
                              
                                <Typography variant="body1">{feedback.feedbackText}</Typography>
                            </Box>
                        ))}
                    </Carousel>
                </Box>
            </Box>
        </>
    );
}

export default PerformancePage;
