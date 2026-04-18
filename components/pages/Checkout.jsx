import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useCart } from "../../context/CartContext";
// QR image uses public path
const QRImage = '/images/Qr.jpeg'

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState();
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
      mobile_num: userMobile,
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
            alert("Order placed! Confirmation sent to Your Email.");
            clearCart();
            setUserEmail("");
            setUpiRef("");
            setDeliveryDate("");
            setDeliveryTime("");
            setDeliveryAddress("");
            setUserMobile();
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

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handleRazorpayCheckout = async () => {
    if (cart.length === 0) return alert('Cart is empty')
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, userEmail, userMobile }),
    })
    const data = await res.json()
    if (!data || !data.orderId) return alert('Payment initialization failed')

    const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if (!ok) return alert('Failed to load Razorpay SDK')

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      name: 'Bakery',
      description: 'Order Payment',
      order_id: data.orderId,
      handler: function (response) {
        // payment successful - response contains razorpay_payment_id, razorpay_order_id, razorpay_signature
        alert('Payment successful. Payment id: ' + response.razorpay_payment_id)
        // redirect to confirmation page or show success
        window.location.href = `/checkout?session_id=${response.razorpay_payment_id}`
      },
      prefill: { email: userEmail, contact: userMobile },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

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
          <div className="mb-3">
            <label className="form-label fw-bold">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your Mobile"
              value={userMobile}
              onChange={(e) => setUserMobile(e.target.value)}
              required
            />
          </div>

          <h5 className="mt-4">Scan to Pay</h5>
          <img
            src={QRImage}
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
          <div className="d-flex gap-2">
            <button
              className="btn btn-success mt-3"
              onClick={handleCheckout}
              disabled={
                !userEmail || !upiRef || !deliveryDate || !deliveryTime || !deliveryAddress || !userMobile
              }
            >
              I Have Paid – Place Order
            </button>

            <button className="btn btn-primary mt-3" onClick={handleRazorpayCheckout}>
              Pay With Card (Razorpay)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
