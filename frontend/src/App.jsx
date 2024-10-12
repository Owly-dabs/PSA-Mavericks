// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import EngagementPage from './components/EngagementPage';
import CareerPage from './components/CareerPage';
import PerformancePage from './components/PerformancePage';

function App() {

  // Initialize isAuthenticated from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Update localStorage whenever isAuthenticated changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);
  
  const handleLogin = () => {
  
    setIsAuthenticated(true);  // Set authenticated to true
  };

  return (
    <>
    {console.log(isAuthenticated)}
    <Router>
      <Routes>
        
        <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/home" />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/courses" element={isAuthenticated ? <CoursesPage /> : <Navigate to="/" />} />
        <Route path="/engagement" element={isAuthenticated ? <EngagementPage /> : <Navigate to="/" />} />
        <Route path="/career" element={isAuthenticated ? <CareerPage /> : <Navigate to="/" />} />
        <Route path="/performance" element={isAuthenticated ? <PerformancePage /> : <Navigate to="/" />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
