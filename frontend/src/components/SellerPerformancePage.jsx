import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { FaChartLine, FaStar, FaBox, FaSmile } from "react-icons/fa";

const metrics = [
  { label: "Order Defect Rate", value: "0.7%", icon: <FaBox />, color: "#d32f2f" },
  { label: "Late Shipment Rate", value: "1.2%", icon: <FaChartLine />, color: "#f9a825" },
  { label: "Feedback Score", value: "4.8/5", icon: <FaStar />, color: "#fbc02d" },
  { label: "Customer Satisfaction", value: "98%", icon: <FaSmile />, color: "#2e7d32" },
];

const ordersData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Orders",
      data: [120, 150, 180, 170, 210, 230],
      backgroundColor: "#1976d2",
      borderRadius: 6,
    },
  ],
};

const ratingsData = {
  labels: ["1★", "2★", "3★", "4★", "5★"],
  datasets: [
    {
      label: "Ratings",
      data: [2, 3, 8, 25, 62],
      backgroundColor: ["#d32f2f", "#fbc02d", "#f9a825", "#1976d2", "#2e7d32"],
      borderRadius: 6,
    },
  ],
};

const SellerPerformancePage = () => (
  <section style={{ width: "100%" }}>
    <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: 18, color: "#232526" }}>
      Performance Dashboard
    </h2>
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 36 }}>
      {metrics.map((item, idx) => (
        <div
          key={idx}
          style={{
            flex: "1 1 220px",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
            padding: "1.5rem 2rem",
            display: "flex",
            alignItems: "center",
            gap: 18,
            minWidth: 220,
            borderLeft: `6px solid ${item.color}`,
          }}
        >
          <span style={{ fontSize: 32, color: item.color }}>{item.icon}</span>
          <div>
            <div style={{ fontSize: 15, color: "#888", fontWeight: 600 }}>{item.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#232526" }}>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={{ flex: "2 1 340px", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(44,62,80,0.07)", padding: "2rem", marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18, color: "#232526" }}>
          Orders Trend (Last 6 Months)
        </div>
        <div style={{ height: 220 }}>
          <Bar data={ordersData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      <div style={{ flex: "1 1 220px", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(44,62,80,0.07)", padding: "2rem", marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18, color: "#232526" }}>
          Ratings Distribution
        </div>
        <div style={{ height: 220 }}>
          <Bar data={ratingsData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
    <div style={{ color: "#888", fontSize: 14, marginTop: 12 }}>
      For detailed performance analytics, visit the <span style={{ color: "#1565c0", fontWeight: 600, cursor: "pointer" }}>Reports</span> section.
    </div>
  </section>
);

export default SellerPerformancePage;
