import React from 'react';
import { Link } from 'react-router-dom';
import './main.css'; // Adjust this path based on your actual file structure

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Hello, I am a test task</h1>
        <Link to="/login" className="login-button">Go to Login Page</Link>
      </div>
    </div>
  );
};

export default HomePage;
