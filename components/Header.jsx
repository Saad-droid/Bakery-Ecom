import React from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll"; // Optional for smooth scrolling
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
        <Link href="/" className="nav-link d-flex align-items-center">
          <img src="/images/logo.png" alt="Morsel's Bay" height="40" />
          <span className="playlist-font ms-2" style={{ color: "brown" }}>
            Morsel's bay
          </span>
        </Link>

        {/* 🛒 Cart - Visible on mobile */}
        <Link href="/cart" className="nav-link d-lg-none ms-auto position-relative" style={{ color: "brown" }}>
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6rem" }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <ScrollLink
              to="shop"
              smooth={true}
              className="nav-link"
              style={{ color: "brown", cursor: "pointer" }}
            >
              Shop
            </ScrollLink>

            <Link href="/about" className="nav-link" style={{ color: "brown" }}>
              About us
            </Link>

            {/* 🛒 Cart - Visible on desktop */}
            <Link href="/cart" className="nav-link d-none d-lg-block position-relative" style={{ color: "brown" }}>
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
