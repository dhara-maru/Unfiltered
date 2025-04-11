import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import HomePage from './components/HomePage';
import AddNote from './components/AddNote';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
