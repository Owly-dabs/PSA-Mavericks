import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';  // Import Paper and Box from @mui/material
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineOppositeContent, TimelineConnector } from '@mui/lab';  // Import Timeline from @mui/lab
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';

export default function CareerPathwayTimeline() {
  const milestones = [
    {
      date: '2015',
      type: 'education',
      title: 'Bachelors in Computer Science',
      description: 'Graduated from XYZ University with a degree in Computer Science.',
    },
    {
      date: '2016',
      type: 'job',
      title: 'Junior Developer at TechCo',
      description: 'Started my career as a Junior Developer at TechCo working on web development.',
    },
    {
      date: '2018',
      type: 'skills',
      title: 'Advanced JavaScript & React Training',
      description: 'Completed advanced training in JavaScript and React development.',
    },
    {
      date: '2019',
      type: 'job',
      title: 'Software Engineer at DevWorks',
      description: 'Promoted to Software Engineer at DevWorks, responsible for full-stack development.',
    },
    {
      date: '2022',
      type: 'education',
      title: 'Masters in Software Engineering',
      description: 'Started a Masters program in Software Engineering at ABC University.',
    },
    {
      date: '2023',
      type: 'job',
      title: 'Senior Developer at CodeLabs',
      description: 'Currently working as a Senior Developer at CodeLabs, leading a team of engineers.',
    },
  ];

  return (
    <Box sx={{ padding: '2em' }}>
      <Typography variant="h5" sx={{ marginBottom: '1em', textAlign: 'center' }}>
        Career Pathway Timeline
      </Typography>

      <Timeline position="alternate">
        {milestones.map((milestone, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0', color: 'text.secondary' }}
            >
              <Typography variant="body2" color="text.secondary">
                {milestone.date}
              </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot color="primary">
                {milestone.type === 'job' && <WorkIcon />}
                {milestone.type === 'education' && <SchoolIcon />}
                {milestone.type === 'skills' && <CodeIcon />}
              </TimelineDot>
              {index < milestones.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Paper sx={{ padding: '1em', borderRadius: '8px', boxShadow: 2 }}>
                <Typography variant="h6">{milestone.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {milestone.description}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
