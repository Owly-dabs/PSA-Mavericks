import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Paper, Typography } from '@mui/material';
import { useState } from 'react';

const steps = [
  'Project Coordinator',
  'Assistant Project Manager',
  'Project Manager',
  'Program Manager',
  'Portfolio Manager',
];

const experienceYears = [
  '1-2 years',
  '2-4 years',
  '4-6 years',
  '6-8 years',
  '8+ years',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  const [activeStep, setActiveStep] = useState(1); // Example step for testing

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            {/* Display the experience for all steps */}
            <Paper sx={{ mt: '1em', padding: '1em' }}>
              <Typography variant="body2">Minimum Experience: {experienceYears[index]}</Typography>
            </Paper>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
