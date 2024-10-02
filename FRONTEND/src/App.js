import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';  // Adjust the case to match the actual file name
import Signup from './components/signup';  // Adjust the case to match the actual file name

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
