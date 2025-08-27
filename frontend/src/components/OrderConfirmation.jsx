import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();
  const {
    orderId,
    orderDate,
    expectedDelivery,
    products,
    address,
    orderTotal,
  } = location.state || {};

  if (!orderId) {
    // If accessed directly, redirect to home
    navigate("/", { replace: true });
    return null;
  }

  // GST and other bill details (mocked for demo)
  const gstRate = 0.05;
  const gstAmount = (orderTotal * gstRate).toFixed(2);
  const subtotal = orderTotal;
  const shipping = 0;
  const total = (subtotal + shipping + Number(gstAmount)).toFixed(2);

  const handlePrint = () => {
    window.print();
  };

  // If products is not present, fallback to single product for backward compatibility
  const orderProducts = products || (location.state?.product ? [location.state.product] : []);

  return (
    <div className="order-confirmation-responsive" style={{ maxWidth: 700, margin: "2.5rem auto", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px #23252622", padding: "2.5rem 2rem" }}>
      <div ref={printRef} id="order-bill-print">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#28a745", fontWeight: 800, marginBottom: "0.7rem" }}>Order Placed Successfully!</h1>
          <div style={{ color: "#232526", fontWeight: 600 }}>
            Thank you for shopping with CLOPICK.<br />
            Your order has been placed and will be processed soon.
          </div>
        </div>
        {/* Bill Header */}
        <div className="order-header" style={{ borderBottom: "2px solid #eee", marginBottom: "1.5rem", paddingBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <img src="/CLOPICK-logo.png" alt="CLOPICK" style={{ height: 40, marginBottom: 8 }} />
            <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>CLOPICK</div>
            <div style={{ fontSize: "0.95rem", color: "#555" }}>www.clopick.com</div>
            <div style={{ fontSize: "0.95rem", color: "#555" }}>GSTIN: 22AAAAA0000A1Z5</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>TAX INVOICE</div>
            <div>Order ID: <b>{orderId}</b></div>
            <div>Order Date: {orderDate}</div>
            <div>Expected Delivery: {expectedDelivery}</div>
          </div>
        </div>
        {/* Bill Addresses */}
        <div className="order-addresses" style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Sold By</div>
            <div>CLOPICK Seller</div>
            <div>123, Business Park, Delhi, India</div>
            <div>GSTIN: 22AAAAA0000A1Z5</div>
            <div>Contact: +91-9999999999</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Shipping Address</div>
            <div>{address.fullName}</div>
            <div>{address.address}</div>
            <div>{address.city}, {address.state} - {address.pincode}</div>
            <div>{address.country}</div>
            <div>Mobile: {address.mobile}</div>
          </div>
        </div>
        {/* Bill Table */}
        <div className="order-table-wrapper" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", minWidth: 600 }}>
            <thead>
              <tr style={{ background: "#f6f7fb" }}>
                <th style={{ border: "1px solid #eee", padding: "0.7rem" }}>Product</th>
                <th style={{ border: "1px solid #eee", padding: "0.7rem" }}>Qty</th>
                <th style={{ border: "1px solid #eee", padding: "0.7rem" }}>Unit Price</th>
                <th style={{ border: "1px solid #eee", padding: "0.7rem" }}>Subtotal</th>
                <th style={{ border: "1px solid #eee", padding: "0.7rem" }}>GST (5%)</th>
                <th style={{ border: "1px solid #eee", padding: "0.7rem" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((item, idx) => {
                const qty = item.quantity || 1;
                const subtotal = item.price * qty;
                const gstAmount = (subtotal * 0.05).toFixed(2);
                const total = (subtotal + Number(gstAmount)).toFixed(2);
                return (
                  <tr key={idx}>
                    <td style={{ border: "1px solid #eee", padding: "0.7rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img src={item.image} alt={item.title} style={{ width: 50, borderRadius: 6 }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{item.title}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ border: "1px solid #eee", padding: "0.7rem", textAlign: "center" }}>{qty}</td>
                    <td style={{ border: "1px solid #eee", padding: "0.7rem", textAlign: "right" }}>₹{item.price}</td>
                    <td style={{ border: "1px solid #eee", padding: "0.7rem", textAlign: "right" }}>₹{subtotal}</td>
                    <td style={{ border: "1px solid #eee", padding: "0.7rem", textAlign: "right" }}>₹{gstAmount}</td>
                    <td style={{ border: "1px solid #eee", padding: "0.7rem", textAlign: "right" }}>₹{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Bill Totals */}
        <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
          <div>Subtotal: <b>₹{orderTotal}</b></div>
          <div>Shipping: <b>₹{shipping}</b></div>
          <div>GST (5%): <b>₹{(orderTotal * gstRate).toFixed(2)}</b></div>
          <div style={{ fontWeight: 700, fontSize: "1.2rem", marginTop: 8 }}>Order Total: ₹{(orderTotal + shipping + Number((orderTotal * gstRate).toFixed(2))).toFixed(2)}</div>
        </div>
        {/* Bill Footer */}
        <div style={{ fontSize: "0.95rem", color: "#555", marginBottom: "1.5rem" }}>
          <div>Payment Method: <b>Prepaid / COD / QR</b></div>
          <div>This is a computer generated invoice and does not require a physical signature.</div>
          <div>For support, contact support@clopick.com</div>
        </div>
      </div>
      <div className="order-buttons" style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={handlePrint}
          style={{
            background: "#232526",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.8rem 2rem",
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer",
            marginRight: "1.2rem"
          }}
        >
          Download / Print Bill
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "0.8rem 2rem",
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer"
          }}
        >
          Continue Shopping
        </button>
      </div>
      {/* Print styles */}
      <style>
        {`
        @media print {
          body * { visibility: hidden; }
          #order-bill-print, #order-bill-print * { visibility: visible; }
          #order-bill-print { position: absolute; left: 0; top: 0; width: 100vw; background: #fff; }
          button { display: none !important; }
        }
        /* Responsive styles */
        .order-confirmation-responsive {
          box-sizing: border-box;
        }
        .order-table-wrapper {
          width: 100%;
        }
        @media (max-width: 900px) {
          .order-confirmation-responsive {
            max-width: 98vw;
            padding: 1.2rem 0.5rem;
          }
        }
        @media (max-width: 700px) {
          .order-header,
          .order-addresses {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.2rem;
          }
          .order-header > div,
          .order-addresses > div {
            width: 100% !important;
            text-align: left !important;
          }
          .order-confirmation-responsive {
            padding: 1rem 0.2rem;
          }
        }
        @media (max-width: 600px) {
          .order-confirmation-responsive {
            max-width: 100vw;
            padding: 0.5rem 0.1rem;
            border-radius: 0;
            box-shadow: none;
          }
          .order-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.7rem;
          }
          .order-addresses {
            flex-direction: column !important;
            gap: 0.7rem;
          }
          .order-table-wrapper {
            overflow-x: auto;
          }
          table {
            min-width: 500px;
            font-size: 0.95rem;
          }
          th, td {
            padding: 0.5rem !important;
          }
          .order-buttons button {
            width: 100%;
            margin: 0.5rem 0 !important;
            font-size: 1rem !important;
            padding: 0.7rem 0 !important;
          }
        }
        @media (max-width: 400px) {
          .order-confirmation-responsive {
            padding: 0.2rem 0.05rem;
          }
          table {
            min-width: 350px;
            font-size: 0.9rem;
          }
          .order-buttons button {
            font-size: 0.95rem !important;
            padding: 0.6rem 0 !important;
          }
        }
        /* Responsive image in table */
        td img {
          width: 38px !important;
          height: auto;
        }
        `}
      </style>
    </div>
  );
};

export default OrderConfirmation;
