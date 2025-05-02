import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { useCart } from "../context/CartContext";
import { Navbar, Nav, Container } from "react-bootstrap";

import { Link } from "react-scroll"; // Optional for smooth scrolling

const Header = () => {
  const { cart } = useCart();
  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className="shadow-sm"
      style={{ backgroundColor: "#4B2E2B" }}
    >
      <Container>
        <NavLink className="nav-link" to="/">
          <img src={logo} alt="Morsel's Bay" height="40" />
          <span
            className="playlist-font"
            style={{ color: "brown" }}
          >
            Morsel's bay
          </span>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link
              to="shop"
              smooth={true}
              className="nav-link"
              href="#shop"
              style={{ color: "brown" }}
            >
              Shop
            </Link>

            <NavLink
              className="nav-link"
              to="/aboutUs"
              style={{ color: "brown" }}
            >
              About us
            </NavLink>
            <NavLink className="nav-link" to="/cart" style={{ color: "brown" }}>
              Cart
              <sup
                style={{
                  borderRadius: "50%",
                  color: "red",
                  textAlign: "center",
                }}
              >
                {" "}
                {cart.length}
              </sup>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
