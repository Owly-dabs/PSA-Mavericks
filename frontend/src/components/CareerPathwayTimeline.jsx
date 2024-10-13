import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Paper } from '@mui/material';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
  'Create an ad',
  'Create an ad',
];

export default function HorizontalLinearAlternativeLabelStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <Paper sx={{mt:'1em', padding:'1em', mx: '5em',}}>job desc</Paper>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}