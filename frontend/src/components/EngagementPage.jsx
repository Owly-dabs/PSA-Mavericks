import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import ActivityCard from './ActivityCard.jsx';
import ActivityCardGrid from './ActivityCardGrid.jsx';

function EngagementPage() {
  return (
    <div>
      <Navbar />
      <h1>ENGAGEMENT</h1>
      <p>Take a break, do an activity!</p>
      <ActivityCardGrid />

    </div>
  );
}

export default EngagementPage;