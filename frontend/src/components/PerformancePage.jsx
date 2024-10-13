// src/components/PerformancePage.js
import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import Navbar from './Navbar.jsx';
import Carousel from 'react-slick'; // Ensure you have react-slick installed

const achievements = [
    { title: 'Achievement 1', icon: '🏆' },
    { title: 'Achievement 2', icon: '🌟' },
    { title: 'Achievement 3', icon: '🥇' },
];

const feedbacks = [
    "Great job on the project! Your dedication really showed.",
    "Your teamwork skills are exemplary, keep it up!",
    "The presentation was top-notch! You really engaged the audience.",
];

function PerformancePage() {
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Performance Overview
                </Typography>

                {/* Display 3 achievements icons */}
                <Grid container spacing={2} justifyContent="center">
                    {achievements.map((achievement, index) => (
                        <Grid item xs={4} key={index} textAlign="center">
                            <Typography variant="h5">{achievement.icon}</Typography>
                            <Typography variant="body1">{achievement.title}</Typography>
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
                                <Typography variant="body1">{feedback}</Typography>
                            </Box>
                        ))}
                    </Carousel>
                </Box>
            </Box>
        </>
    );
}

export default PerformancePage;