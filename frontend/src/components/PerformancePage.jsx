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
        const badgeEndpoint = `http://localhost:3000/api/performance/getBadges/${userId}`;
        console.log(badgeEndpoint)

        fetch(badgeEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAchievements(data["badges"]);
                console.log(data["badges"]);
            })
            .catch(error => {
                console.error("There was an error fetching the achievements!", error);
            });

        const feedbackEndpoint = `http://localhost:3000/api/performance/${userId}/getFeedback`;
        console.log(feedbackEndpoint)

        fetch(feedbackEndpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFeedbacks(data["feedbackList"]);
                console.log(data["feedbackList"]);
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
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Performance Overview
                </Typography>

                {/* Display achievements in cards */}
                <Grid container spacing={2} justifyContent="center">
                    {achievements.map((achievement, index) => (
                        <Grid item xs={3} key={index} textAlign="center">
                            <Card sx={{
                                 width: 200, height: 300, textAlign: 'center' ,
                                 transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition
                                 '&:hover': {
                                     transform: 'scale(1.05)', // Slightly increase size on hover
                                     boxShadow: '0px 10px 20px rgba(0,0,0,0.2)', // Add shadow on hover
                                 },
                                 }}>
                                <CardMedia
                                    component="img"
                                    src={`/badges/${achievement.icon}`} // Adjusted to your badges directory
                                    alt={achievement.name}
                                    sx={{
                                        height: 200, // Adjust height
                                        objectFit: 'contain',
                                        pt: 2, // Adjust padding
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="body1">{achievement.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Display a carousel of feedback from other employees */}
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Employee Feedback
                    </Typography>
                    <Carousel {...carouselSettings}>
                        {feedbacks.map((feedback, index) => (
                            <Box key={index} sx={{ padding: 2 }}>
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
