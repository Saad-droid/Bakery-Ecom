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
    name: "5 Cupcake bouqet",
    price: "₹650",
    stock: 16,
    image:cakeset
  },
  {
    name: "Mixfruit Cake Tub",
    price: "₹250",
    stock: 9,
    image:MixFruit
  },
  {
    name: "Half Kg Dry Fruit Cake",
    price: "₹500",
    stock: 10,
    image:dryfruit
  },
  {
    name: "Mini BlueBerry Cheesecake",
    price: "₹189",
    stock: 15,
    image:blueberrycheesecake
  },
  {
    name: "Mini Nutella Cheesecake",
    price: "₹189",
    stock: 12,
    image:nutellacheesecake,
  },
  {
    name: "Mini Biscoff Cheesecake",
    price: "₹189",
    stock: 10,
    image:biscoffchessecake,
  },
  {
    name: "6 Ferraro Cup Cakes",
    price: "₹900",
    stock: 17,
    image:ferrerocupcake,
  },
  {
    name: "6 Classic Choclate Cup Cakes",
    price: "₹500",
    stock: 15,
    image:choclatecupcake,
  },
  {
    name: "6 Nutella Cup Cakes",
    price: "₹600",
    stock: 20,
    image:nutellacupcake,
  },
  {
    name: "Choclate Box",
    price: "₹450",
    stock: 10,
    image:choclateBox10,
  },
  {
    name: " Half Kg Rasberry Cheesecake",
    price: "₹1600",
    stock: 10,
    image:rasberryCheesecake
  },
  {
    name: "200 gm Tiramisu",
    price: "₹350",
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
                  // style={{height:"80%"}}
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
                  <div>only {product.stock} left!!</div>
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
