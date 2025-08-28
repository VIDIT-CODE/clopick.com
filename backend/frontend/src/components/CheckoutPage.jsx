import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Support both single product and cart items
  const product = location.state?.product;
  const cartItems = location.state?.cartItems;

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    paymentMethod: "cod",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [showQR, setShowQR] = useState(false);

  // If neither product nor cart items, show error
  if (!product && (!cartItems || cartItems.length === 0)) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        No product selected for checkout.
      </div>
    );
  }

  // Calculate order total for cart
  const orderProducts = cartItems && cartItems.length > 0 ? cartItems : product ? [product] : [];
  const orderTotal = orderProducts.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date();
    const expectedDelivery = new Date(orderDate);
    expectedDelivery.setDate(orderDate.getDate() + 2);

    navigate("/order-confirmation", {
      state: {
        orderId,
        orderDate: orderDate.toLocaleString(),
        expectedDelivery: expectedDelivery.toDateString(),
        products: orderProducts,
        address: {
          fullName: form.fullName,
          mobile: form.mobile,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          country: form.country,
        },
        orderTotal,
      },
      replace: true,
    });
  };

  const isFormFilled = () => {
    // All required fields except card fields for QR
    return (
      form.fullName.trim() &&
      form.mobile.trim() &&
      form.address.trim() &&
      form.city.trim() &&
      form.state.trim() &&
      form.pincode.trim() &&
      form.country.trim()
    );
  };

  return (
    <div
      style={{
        maxWidth: "100vw",
        margin: "2rem auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 12px #23252622",
        padding: "2.5rem 2rem",
        display: "flex",
        gap: "2.5rem",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {/* Product/Cart Summary */}
      <div
        style={{
          flex: "1 1 320px",
          minWidth: 320,
          maxWidth: "100%",
        }}
      >
        <h2
          style={{
            fontWeight: 800,
            color: "#232526",
            marginBottom: "1.2rem",
            fontSize: "1.3rem",
            textAlign: "center",
          }}
        >
          Order Summary
        </h2>
        {orderProducts.map((item, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 18,
              borderBottom: "1px solid #eee",
              paddingBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                marginBottom: 8,
                objectFit: "cover",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: "#388e3c", fontWeight: 600, marginBottom: 4 }}>In stock</div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 4 }}>₹{item.price} {item.quantity ? `x ${item.quantity}` : ""}</div>
              <div style={{ color: "#232526", marginBottom: 4 }}>Delivery: <b>Tomorrow</b></div>
            </div>
          </div>
        ))}
        <div style={{ fontWeight: 700, fontSize: "1.15rem", marginTop: 12, textAlign: "right" }}>
          Order Total: ₹{orderTotal}
        </div>
      </div>
      {/* Checkout Form */}
      <form
        onSubmit={handlePlaceOrder}
        style={{
          flex: "2 1 400px",
          minWidth: 320,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem",
        }}
      >
        <h2
          style={{
            fontWeight: 800,
            color: "#232526",
            marginBottom: "1.2rem",
            fontSize: "1.3rem",
            textAlign: "center",
          }}
        >
          Delivery Address
        </h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
          style={{
            padding: "0.7rem 1rem",
            borderRadius: 8,
            border: "1.5px solid #ccc",
            fontSize: "1.08rem",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
          style={{
            padding: "0.7rem 1rem",
            borderRadius: 8,
            border: "1.5px solid #ccc",
            fontSize: "1.08rem",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <textarea
          name="address"
          placeholder="Address (House No, Street, Area)"
          value={form.address}
          onChange={handleChange}
          required
          style={{
            padding: "0.7rem 1rem",
            borderRadius: 8,
            border: "1.5px solid #ccc",
            fontSize: "1.08rem",
            minHeight: 60,
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              padding: "0.7rem 1rem",
              borderRadius: 8,
              border: "1.5px solid #ccc",
              fontSize: "1.08rem",
              minWidth: 120,
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              padding: "0.7rem 1rem",
              borderRadius: 8,
              border: "1.5px solid #ccc",
              fontSize: "1.08rem",
              minWidth: 120,
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              padding: "0.7rem 1rem",
              borderRadius: 8,
              border: "1.5px solid #ccc",
              fontSize: "1.08rem",
              minWidth: 120,
              boxSizing: "border-box",
            }}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              padding: "0.7rem 1rem",
              borderRadius: 8,
              border: "1.5px solid #ccc",
              fontSize: "1.08rem",
              minWidth: 120,
              boxSizing: "border-box",
            }}
          />
        </div>
        <h2
          style={{
            fontWeight: 800,
            color: "#232526",
            margin: "1.5rem 0 1.2rem 0",
            fontSize: "1.3rem",
            textAlign: "center",
          }}
        >
          Payment Method
        </h2>
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <label style={{ minWidth: 120 }}>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={handleChange}
            /> Cash on Delivery
          </label>
          <label style={{ minWidth: 120 }}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={form.paymentMethod === "card"}
              onChange={handleChange}
            /> Credit/Debit Card
          </label>
          <label style={{ minWidth: 120 }}>
            <input
              type="radio"
              name="paymentMethod"
              value="qr"
              checked={form.paymentMethod === "qr"}
              onChange={(e) => {
                handleChange(e);
                setShowQR(false);
              }}
            /> QR Code
          </label>
        </div>
        {form.paymentMethod === "card" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={form.cardNumber}
              onChange={handleChange}
              required
              style={{
                padding: "0.7rem 1rem",
                borderRadius: 8,
                border: "1.5px solid #ccc",
                fontSize: "1.08rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <input
                type="text"
                name="cardExpiry"
                placeholder="MM/YY"
                value={form.cardExpiry}
                onChange={handleChange}
                required
                style={{
                  flex: 1,
                  padding: "0.7rem 1rem",
                  borderRadius: 8,
                  border: "1.5px solid #ccc",
                  fontSize: "1.08rem",
                  minWidth: 120,
                  boxSizing: "border-box",
                }}
              />
              <input
                type="text"
                name="cardCVC"
                placeholder="CVC"
                value={form.cardCVC}
                onChange={handleChange}
                required
                style={{
                  flex: 1,
                  padding: "0.7rem 1rem",
                  borderRadius: 8,
                  border: "1.5px solid #ccc",
                  fontSize: "1.08rem",
                  minWidth: 120,
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        )}
        {form.paymentMethod === "qr" && (
          <div style={{ margin: "1rem 0" }}>
            <button
              type="button"
              disabled={!isFormFilled()}
              onClick={() => setShowQR(true)}
              style={{
                background: isFormFilled() ? "#232526" : "#888",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.7rem 1.2rem",
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: isFormFilled() ? "pointer" : "not-allowed",
                marginBottom: "1rem",
                width: "100%",
              }}
            >
              {showQR ? "QR Code Generated" : "Generate QR Code"}
            </button>
            {showQR && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    `upi://pay?pa=vidit18@ptaxis&pn=CLOPICK&am=${orderTotal}&cu=INR`
                  )}`}
                  alt="Scan to Pay"
                  style={{ width: 180, height: 180, marginBottom: 8, maxWidth: "100%" }}
                />
                <div style={{ fontWeight: 600, color: "#232526" }}>Scan to Pay</div>
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          style={{
            background: "#232526",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.9rem 1.2rem",
            fontWeight: 700,
            fontSize: "1.15rem",
            marginTop: "1.2rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px #23252622",
            transition: "background 0.2s",
            width: "100%",
          }}
        >
          Place your order
        </button>
      </form>
      {/* Responsive styles for mobile */}
      <style>
        {`
        @media (max-width: 900px) {
          div[style*="maxWidth: 100vw"] {
            flex-direction: column !important;
            gap: 1.2rem !important;
            padding: 1.2rem 0.5rem !important;
          }
          form[style] {
            min-width: 0 !important;
            padding: 0 !important;
          }
          div[style*="flex: 1 1 320px"] {
            min-width: 0 !important;
            padding: 0 !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="maxWidth: 100vw"] {
            padding: 0.7rem 0.1rem !important;
          }
          h2 {
            font-size: 1rem !important;
            margin-bottom: 0.7rem !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default CheckoutPage;
