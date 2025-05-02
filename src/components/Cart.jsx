import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, increment, decrement, removeFromCart } = useCart();
  const [deliveryDate, setDeliveryDate] = useState("");
  const navigate = useNavigate();
  const total = cart.reduce(
    (sum, item) => sum + item.quantity * parseInt(item.price.slice(1)),
    0
  );

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between border-bottom py-3"
            >
              <img
                src={item.image}
                alt={item.name}
                width="80"
                height="80"
                className="me-3 rounded shadow-sm"
              />
              <div className="flex-grow-1">
                <h6 className="mb-1">{item.name}</h6>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => decrement(item.name)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => increment(item.name)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-end">
                <strong>
                  ₹{item.quantity * parseInt(item.price.slice(1))}
                </strong>
                <button
                  className="btn btn-sm btn-danger ms-3"
                  onClick={() => removeFromCart(item.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 text-end">
            <h5>Total: ₹{total}</h5>

            <button
              className="btn btn-success mt-3"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
