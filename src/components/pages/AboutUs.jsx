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
          The name Morsel’s Bay reflects both the small, delightful nature of baked goods ("morsels") and the calm,
           comforting feeling of a coastal bay—a nod to warmth, nostalgia, and home.Morsel’s Bay began with
            a simple love for baking and the joy of sharing homemade treats with family and friends.
             What started as weekend baking experiments quickly grew into frequent requests for cakesicles , 
             cupcakes and brownies for sweetooth.
          </p>
          <p>
          Recipes were refined, packaging tested, and a few signature items like 
          cakesicles,cupcakes and slab cakes became instant favorites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
