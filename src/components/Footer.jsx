// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer
      className=" text-white text-center py-4 mt-5"
      style={{ backgroundColor: "#654321" }}
    >
      <div className="container">
        <p className="mb-1">
          © {new Date().getFullYear()} Morsel's Bay. All rights reserved.
        </p>
        <p className="mb-0">
          Follow us on{" "}
          <a
            href="https://instagram.com/morselsbay"
            target="_blank"
            rel="noreferrer"
            className="text-warning"
          >
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
