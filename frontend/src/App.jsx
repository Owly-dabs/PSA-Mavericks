import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import NavBar from './components/Navbar.jsx';
import EngagementPage from './components/EngagementPage';
import CareerPage from './components/CareerPage';
import PerformancePage from './components/PerformancePage';
import IndividualActivity from './components/IndividualActivity';
import IndividualCourse from './components/IndividualCourse.jsx'
import Footer from './components/Footer';  // Import the Footer component

function App() {
  // Initialize isAuthenticated from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  // Update localStorage whenever isAuthenticated changes
  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);  // Set authenticated to true
  };

  const handleLogout = () => {
    setIsAuthenticated(false);  // Set authenticated to false
    sessionStorage.removeItem('isAuthenticated');  // Remove authentication from sessionStorage
  };

  return (
    <>
      {isAuthenticated && <NavBar onLogout={handleLogout} />}
      
        <div style={{ backgroundColor: isAuthenticated ? '#eff6ff' : 'white', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/career" />} />
            <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
            {/* <Route path="/courses" element={isAuthenticated ? <CoursesPage /> : <Navigate to="/" />} /> */}
            <Route path="/engagement" element={isAuthenticated ? <EngagementPage /> : <Navigate to="/" />} />
            <Route path="/career" element={isAuthenticated ? <CareerPage /> : <Navigate to="/" />} />
            <Route path="/performance" element={isAuthenticated ? <PerformancePage /> : <Navigate to="/" />} />
            <Route path="/engagement/:id" element={isAuthenticated ? <IndividualActivity /> : <Navigate to="/" />} />
            <Route path="/courses/:id" element={isAuthenticated ? <IndividualCourse /> : <Navigate to="/" />} />
          </Routes>
          {isAuthenticated && <Footer />}  {/* Add the footer here after login */}
        </div>
      
    </>
  );
}

export default App;
