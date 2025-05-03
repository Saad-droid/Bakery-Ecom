import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { useCart } from "../context/CartContext";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-scroll"; // Optional for smooth scrolling
import { FaShoppingCart } from "react-icons/fa"; // Cart icon

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.length;

  return (
    <Navbar
    bg="light"
    expand="lg"
    sticky="top"
    className="shadow-sm"
    style={{ backgroundColor: "#4B2E2B" }}
    >
      <Container>
        {/* Logo & Brand */}
        <NavLink className="nav-link d-flex align-items-center" to="/">
          <img src={logo} alt="Morsel's Bay" height="40" />
          <span className="playlist-font ms-2" style={{ color: "brown" }}>
            Morsel's bay
          </span>
        </NavLink>

        {/* 🛒 Cart - Visible on mobile */}
        <NavLink
          className="nav-link d-lg-none ms-auto position-relative"
          to="/cart"
          style={{ color: "brown" }}
        >
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6rem" }}
            >
              {cartCount}
            </span>
          )}
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Link
              to="shop"
              smooth={true}
              className="nav-link"
              style={{ color: "brown", cursor: "pointer" }}
            >
              Shop
            </Link>

            <NavLink className="nav-link" to="/aboutUs" style={{ color: "brown" }}>
              About us
            </NavLink>

            {/* 🛒 Cart - Visible on desktop */}
            <NavLink
              className="nav-link d-none d-lg-block position-relative"
              to="/cart"
              style={{ color: "brown" }}
            >
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem" }}
                >
                  {cartCount}
                </span>
              )}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
