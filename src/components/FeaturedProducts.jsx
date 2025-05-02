// src/components/FeaturedProducts.jsx
import React from "react";
import cakeset from "../images/cakeset.jpg";
import biscoffchessecake from "../images/biscoffchessecake.jpg";
import MixFruit from "../images/MixFruit.jpg";
import blueberrycheesecake from "../images/blueberrycheesecake.jpg";
import ferrerocupcake from "../images/ferrerocupcake'.jpg";
import choclateBox10 from "../images/choclateBox10.jpg";
import choclatecupcake from "../images/choclatecupcake.jpg";
import dryfruit from "../images/dryfruit.jpg";
import nutellacheesecake from "../images/nutellacheesecake.jpg";

import tiramisu from "../images/tiramisu.jpg";
import nutellacupcake from "../images/nutellacupcake.jpg";
import rasberryCheesecake from "../images/rasberryCheesecake.JPG";


const products = [
  {
    name: "24 Ferrero Loaded Cake",
    price: "₹899",
    stock: 10,
    image:cakeset
  },
  {
    name: "Belgian Chocolate Rosette Cake",
    price: "₹749",
    stock: 10,
    image:MixFruit
  },
  {
    name: "Berry Chantilly Cake",
    price: "₹799",
    stock: 10,
    image:dryfruit
  },
  {
    name: "12 Ferrero Loaded Cake",
    price: "₹399",
    stock: 15,
    image:blueberrycheesecake
  },
  {
    name: "Chantilly Cake",
    price: "₹299",
    stock: 10,
    image:nutellacheesecake,
  },
  {
    name: "Chantilly Cake",
    price: "₹299",
    stock: 10,
    image:biscoffchessecake,
  },
  {
    name: "Chantilly Cake",
    price: "₹299",
    stock: 10,
    image:ferrerocupcake,
  },
  {
    name: "Chantilly Cake",
    price: "₹299",
    stock: 10,
    image:choclatecupcake,
  },
  {
    name: "Chantilly Cake",
    price: "₹299",
    stock: 10,
    image:nutellacupcake,
  },
  {
    name: "Chantilly Cake",
    price: "₹299",
    stock: 10,
    image:choclateBox10,
  },
  {
    name: "ras Cake",
    price: "₹299",
    stock: 10,
    image:rasberryCheesecake
  },
  {
    name: "Chantilly Cake",
    price: "₹299",
    stock: 10,
    image:tiramisu,
  },
];
import { useCart } from "../context/CartContext";

const FeaturedProducts = () => {
  const { addToCart, cart, decrement } = useCart();

  const getQuantity = (name) => {
    const item = cart.find((p) => p.name === name);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container py-5" id="shop">
      <h2 className="text-center mb-4">Our Bestsellers</h2>
      <div className="row ">
        {products.map((product, idx) => {
          const quantity = getQuantity(product.name);
          return (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm" style={{ color: "brown" }}>
                <img
                  src={product.image}
                  // style={{height:"60%"}}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">{product.price}</p>

                  {quantity > 0 ? (
                    <div>
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => decrement(product.name)}
                      >
                        -
                      </button>
                      <span style={{ padding: "5px" }}>{quantity}</span>
                      
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => addToCart(product)}
                        disabled={quantity >= product.stock}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-dark"
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      Add to cart
                    </button>
                  )}
                  <div>only {product.stock} left</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
