import React from "react";

const AboutUs = () => {
  return (
    <div className="container py-5" id="about">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWVyvYpWfQQI4-MtMDfccS5VGcLghbfBGgg&s"
            alt="About MugCakes"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>About Us</h2>
          <p>
            At this bakery, we believe baking is both an art and a passion.
            Based in delhi, we craft 100% eggless, homemade cakes, loaded with
            premium ingredients and made with love.
          </p>
          <p>
            Our founder started this to bring joy through rich flavors and
            aesthetics—from Ferrero-loaded cakes to Belgian chocolate rosettes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
