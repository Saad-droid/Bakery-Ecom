// src/components/HeroSection.jsx
import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const style = {
    backgroundImage: `url(/images/bg.jpeg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className={styles.heroSection} style={style}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
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
