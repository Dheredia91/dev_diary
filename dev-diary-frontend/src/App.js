import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Notes from './components/Notes';
import Categories from './components/Categories';
import Navbar from './components/Navbar';
import Login from './components/Login'; 
import Register from './components/Register'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Include the Navbar component */}
        <Routes>
          <Route path="/notes" element={<Notes />} /> {/* Route for Notes component */}
          <Route path="/categories" element={<Categories />} /> {/* Route for Categories component */}
          <Route path="/login" element={<Login />} /> {/* Route for Login component */}
          <Route path="/register" element={<Register />} /> {/* Route for Register component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;