// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import NavBar from './components/Navbar.jsx'

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
    <Router>
      <Routes>
        
        <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/home" />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/courses" element={isAuthenticated ? <CoursesPage /> : <Navigate to="/" />} />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
