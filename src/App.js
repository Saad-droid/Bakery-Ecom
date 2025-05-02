import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import "./styles.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/pages/AboutUs";
import Checkout from "./components/pages/Checkout";
import CarouselComponent from "./components/Caraosel";

const App = () => {
  return (
    <Router>
      <div className="page-wrapper">
        <Header />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <br/>
                  <CarouselComponent/>
                  <FeaturedProducts />
                </>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
