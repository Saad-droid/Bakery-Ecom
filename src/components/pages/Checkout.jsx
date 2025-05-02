import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [upiRef, setUpiRef] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * parseInt(item.price.slice(1)),
    0
  );

  const handleCheckout = () => {
    const orderDetails = cart
      .map((item) => `${item.name} (x${item.quantity})`)
      .join(", ");

    const templateParams = {
      user_email: userEmail,
      order_list: orderDetails,
      delivery_date: deliveryDate,
      delivery_time: deliveryTime,
      delivery_address: deliveryAddress,
      upi_ref: upiRef,
      total_price: `₹${total}`,
    };

    // Send to user
    emailjs
      .send(
        "service_efehb8h",
        "template_z39flyj",
        templateParams,
        "N4uQw698B-6ac7_Wl"
      )
      .then(() => {
        // Send to owner
        emailjs
          .send(
            "service_efehb8h",
            "template_1l2jjzb",
            templateParams,
            "N4uQw698B-6ac7_Wl"
          )
          .then(() => {
            alert("Order placed! Confirmation sent to you and the bakery.");
            clearCart();
            setUserEmail("");
            setUpiRef("");
            setDeliveryDate("");
            setDeliveryTime("");
            setDeliveryAddress("");
          })
          .catch((err) => {
            console.error("Owner email failed:", err);
            alert("Order sent to you, but failed to notify bakery.");
          });
      })
      .catch((err) => {
        console.error("User email failed:", err);
        alert("Failed to place order. Try again.");
      });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Confirm Your Order</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Delivery Date</label>
            <input
              type="date"
              className="form-control"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Delivery Time</label>
            <input
              type="time"
              className="form-control"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Delivery Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            />
          </div>

          <h5 className="mt-4">Scan to Pay</h5>
          <img
            src="https://pngimg.com/d/qr_code_PNG14.png"
            alt="UPI QR Code"
            width="200"
            className="d-block mb-3"
          />

          <div className="mb-3">
            <label className="form-label fw-bold">
              UPI Ref Number (Last 4 digits)
            </label>
            <input
              type="text"
              className="form-control"
              value={upiRef}
              onChange={(e) => setUpiRef(e.target.value)}
              placeholder="e.g., 7432"
              maxLength="6"
              required
            />
          </div>

          <h5 className="mt-4">Total: ₹{total}</h5>

          <button
            className="btn btn-success mt-3"
            onClick={handleCheckout}
            disabled={
              !userEmail || !upiRef || !deliveryDate || !deliveryTime || !deliveryAddress
            }
          >
            I Have Paid – Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
