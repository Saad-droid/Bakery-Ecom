// src/components/HeroSection.jsx
import React from "react";
import "./HeroSection.css"; // You can add custom CSS here

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="display-4 fw-bold">Hand Crafted Dreamy Desserts</h1>
        <p className="lead">Freshly Baked to Perfection.</p>
        <a href="#shop" className="btn btn-warning btn-lg mt-3">
          Order Now
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
