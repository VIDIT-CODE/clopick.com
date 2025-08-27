import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try backend API first, fallback to localStorage for demo/dev
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("clopick_customer_token");
        let fetched = false;
        if (token) {
          const res = await fetch("/api/customer/orders", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            if (data.orders && data.orders.length > 0) {
              setOrders(data.orders);
              fetched = true;
            }
          }
        }
        if (!fetched) {
          // fallback to localStorage (for local/dev/demo)
          const stored = localStorage.getItem("clopick_orders");
          if (stored) {
            setOrders(JSON.parse(stored));
          } else {
            setOrders([]);
          }
        }
      } catch {
        // fallback to localStorage
        const stored = localStorage.getItem("clopick_orders");
        if (stored) {
          setOrders(JSON.parse(stored));
        } else {
          setOrders([]);
        }
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#232526" }}>
        <h2>My Orders</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#232526" }}>
        <h2>My Orders</h2>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", maxWidth: "100vw", margin: 0, padding: "2.5rem 0 2.5rem 0", background: "#f6f7fb", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "2.2rem", color: "#232526", fontSize: "2.1rem", fontWeight: 800, letterSpacing: 1, textAlign: "center" }}>
        My Orders
      </h2>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "2.2rem",
        alignItems: "center",
        width: "100%",
      }}>
        {orders.map((order, idx) => (
          <div
            key={order._id || order.id || idx}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.2rem",
              border: "1.5px solid #e3e8ee",
              borderRadius: 18,
              background: "#fff",
              boxShadow: "0 4px 24px 0 rgba(44,62,80,0.07), 0 1.5px 8px #e0e7ef",
              padding: "1.5rem 2.2rem",
              alignItems: "flex-start",
              minHeight: 180,
              width: "90vw",
              maxWidth: 1200,
              position: "relative",
            }}
          >
            <div style={{ minWidth: 140, maxWidth: 180, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
              <img
                src={order.product?.image}
                alt={order.product?.title}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 12,
                  background: "#f6f7fb",
                  boxShadow: "0 2px 12px #e0e0e0",
                  border: "1.5px solid #e3e8ee",
                }}
              />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "1.2rem" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 6, color: "#232526" }}>
                    {order.product?.title || "Product"}
                  </div>
                  <div style={{ fontWeight: 600, color: "#1976d2", fontSize: 18, marginBottom: 2 }}>
                    ₹{order.product?.price}
                  </div>
                  <div style={{ fontSize: 15, color: "#555", marginBottom: 2 }}>
                    Order Date:{" "}
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div style={{
                    fontSize: 15,
                    color: "#388e3c",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}>
                    Status: {order.status || "Placed"}
                  </div>
                  {order.address && (
                    <div
                      style={{
                        fontSize: 15,
                        color: "#444",
                        marginTop: 6,
                        marginBottom: 2,
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>Delivery Address:</span> {order.address.line1}, {order.address.city}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 18, justifyContent: "flex-end" }}>
                <button
                  style={{
                    background: "#232526",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "0.6rem 1.5rem",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 1.5px 8px #e0e7ef",
                    transition: "background 0.18s",
                  }}
                  onClick={() => alert("Track feature coming soon!")}
                >
                  Track Package
                </button>
                <button
                  style={{
                    background: "#f6f7fb",
                    color: "#232526",
                    border: "1.5px solid #e3e8ee",
                    borderRadius: 8,
                    padding: "0.6rem 1.5rem",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 1.5px 8px #e0e7ef",
                    transition: "background 0.18s",
                  }}
                  onClick={() => alert("Return/Replace feature coming soon!")}
                >
                  Return/Replace
                </button>
              </div>
              {/* Progress Bar */}
              <div style={{ marginTop: 28, marginBottom: 2 }}>
                <div style={{
                  width: "100%",
                  height: 6,
                  background: "#e3e8ee",
                  borderRadius: 4,
                  position: "relative",
                  marginBottom: 18,
                }}>
                  {/* Example: show progress up to "Order Placed" */}
                  <div style={{
                    width: "20%",
                    height: "100%",
                    background: "#388e3c",
                    borderRadius: 4,
                    transition: "width 0.4s",
                  }} />
                  {/* Breakpoints */}
                  {["Order Placed", "Order Shipped", "Arriving", "Out for delivery", "Delivered"].map((label, i) => (
                    <div key={label} style={{
                      position: "absolute",
                      left: `${i * 25}%`,
                      top: 12,
                      width: 120,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: i === 0 ? "left" : i === 4 ? "right" : "center",
                      fontSize: 13,
                      color: "#232526",
                      fontWeight: 600,
                      transform: i === 0 ? "translateX(0)" : i === 4 ? "translateX(-100%)" : "translateX(-50%)"
                    }}>
                      <div style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: "#388e3c",
                        border: "2px solid #fff",
                        boxShadow: "0 1.5px 8px #e0e7ef",
                        margin: "0 auto 4px auto"
                      }} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              {/* End Progress Bar */}
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "#f9a825",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                borderRadius: 6,
                padding: "2px 10px",
                boxShadow: "0 1.5px 8px #e0e7ef",
                margin: "10px 10px 0 0",
                zIndex: 1,
              }}>
                Order ID: {order._id || order.id || idx + 1001}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
