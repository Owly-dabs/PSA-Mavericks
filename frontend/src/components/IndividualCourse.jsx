import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

import { projectManagementCourses } from './mock'; // Adjust the import based on where your course data is

export default function IndividualActivity() {
  const { id } = useParams();  // Get the course ID from the URL
  const course = projectManagementCourses.find(course => course.id === Number(id)); // Find the course by id



  return (
<Box sx={{ padding: '2em', paddingBottom:'12em', display: 'flex', gap: '2em', alignItems: 'flex-start' }}>
      {/* Image section */}
      <img
        src={course.image}
        style={{
          width: '50vw', // Set the width to 50% of the viewport width
          height: 'auto', // Maintain aspect ratio
          flex: '0 0 auto',
          margin: '2em',
        }}
        alt="Activity"
      />

      {/* Text section */}
      <Box sx={{ flex: '1' }}>
        <h1>{course.title}</h1>
 
        <p>{course.description}</p>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Duration:</strong> {course.duration} hours</p>
        <p><strong>Category:</strong> {course.category}</p>
        </Box>
        </Box>
  );
}
