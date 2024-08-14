import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './slices/authSlice';  
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login'; 
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 
import './styles/dashboard.css'; 

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => !!state.auth.user); 

  useEffect(() => {
    const user = localStorage.getItem('access_token');
    if (user) {
      dispatch(loadUser({ username: 'stored_username' }));  
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} /> 
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
