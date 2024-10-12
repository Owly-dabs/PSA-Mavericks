// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLogin = () => {
  
    setIsAuthenticated(true);  // Set authenticated to true
  };

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/home" />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/courses" element={isAuthenticated ? <CoursesPage /> : <Navigate to="/" />} />
        
      </Routes>
    </Router>
  );
}

export default App;
