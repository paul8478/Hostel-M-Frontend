// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../Images/hosttel.jpeg"; 
import "../components/Home.css"; 

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // This will redirect to the login page
  };

  return (
    <div className="home-container">
      <div className="content-section">
        <div className="home-hero">
          <h1 className="home-title">Hostel Management</h1>
          <p className="home-subtitle">
            Community driver hostel management system
          </p>
          <button className="home-button" onClick={handleLoginClick}>
            Login to Your Account
          </button>
        </div>
      </div>
      
      <div className="image-section">
        <img
          src={banner}
          alt="Creative Learning Platform"
          className="floating-illustration"
          loading="eager"
          decoding="sync"
        />
      </div>
    </div>
  );
};

export default Home;
