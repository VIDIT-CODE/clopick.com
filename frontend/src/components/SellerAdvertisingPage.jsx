import React from "react";
import { Bar } from "react-chartjs-2";
import { FaBullhorn, FaChartBar, FaMoneyBillWave } from "react-icons/fa";

const campaigns = [
  { name: "Summer Sale", clicks: 320, spend: "₹1,200", status: "Active" },
  { name: "New Arrivals", clicks: 210, spend: "₹900", status: "Paused" },
  { name: "Clearance", clicks: 150, spend: "₹500", status: "Active" },
];

const adData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Ad Clicks",
      data: [120, 180, 140, 210],
      backgroundColor: "#1976d2",
      borderRadius: 6,
    },
    {
      label: "Ad Spend (₹)",
      data: [400, 600, 500, 800],
      backgroundColor: "#f9a825",
      borderRadius: 6,
    },
  ],
};

const SellerAdvertisingPage = () => (
  <section style={{ width: "100%" }}>
    <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: 18, color: "#232526" }}>
      Advertising Dashboard
    </h2>
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 36 }}>
      <div style={{
        flex: "1 1 220px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: 18,
        minWidth: 220,
        borderLeft: "6px solid #1976d2",
      }}>
        <span style={{ fontSize: 32, color: "#1976d2" }}><FaBullhorn /></span>
        <div>
          <div style={{ fontSize: 15, color: "#888", fontWeight: 600 }}>Active Campaigns</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#232526" }}>2</div>
        </div>
      </div>
      <div style={{
        flex: "1 1 220px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        gap: 18,
        minWidth: 220,
        borderLeft: "6px solid #f9a825",
      }}>
        <span style={{ fontSize: 32, color: "#f9a825" }}><FaMoneyBillWave /></span>
        <div>
          <div style={{ fontSize: 15, color: "#888", fontWeight: 600 }}>Total Spend</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#232526" }}>₹2,600</div>
        </div>
      </div>
    </div>
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
      padding: "2rem",
      marginBottom: 24,
      overflowX: "auto"
    }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18, color: "#232526" }}>
        Campaign Performance (Last 4 Weeks)
      </div>
      <div style={{ height: 220 }}>
        <Bar data={adData} options={{ responsive: true, plugins: { legend: { position: "bottom" } }, maintainAspectRatio: false }} />
      </div>
    </div>
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
      padding: "2rem",
      marginBottom: 24,
      overflowX: "auto"
    }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18, color: "#232526" }}>
        Campaigns
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
        <thead>
          <tr style={{ background: "#f6f7fb", color: "#232526" }}>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px 12px", textAlign: "right" }}>Clicks</th>
            <th style={{ padding: "10px 12px", textAlign: "right" }}>Spend</th>
            <th style={{ padding: "10px 12px", textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px 12px" }}>{c.name}</td>
              <td style={{ padding: "10px 12px", textAlign: "right" }}>{c.clicks}</td>
              <td style={{ padding: "10px 12px", textAlign: "right" }}>{c.spend}</td>
              <td style={{
                padding: "10px 12px",
                textAlign: "center",
                color: c.status === "Active" ? "#2e7d32" : "#888",
                fontWeight: 600
              }}>
                {c.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ color: "#888", fontSize: 14, marginTop: 12 }}>
      For advanced advertising tools, visit the <span style={{ color: "#1565c0", fontWeight: 600, cursor: "pointer" }}>Advertising Console</span>.
    </div>
  </section>
);

export default SellerAdvertisingPage;
