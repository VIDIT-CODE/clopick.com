import React from "react";
import { FaFileAlt, FaDownload, FaChartPie } from "react-icons/fa";

const reports = [
  { name: "Sales Report", date: "2024-06-12", type: "CSV", status: "Ready" },
  { name: "Payments Report", date: "2024-06-10", type: "PDF", status: "Ready" },
  { name: "Performance Report", date: "2024-06-09", type: "CSV", status: "Ready" },
];

const SellerReportsPage = () => (
  <section style={{ width: "100%" }}>
    <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: 18, color: "#232526" }}>
      Reports Center
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
        <span style={{ fontSize: 32, color: "#1976d2" }}><FaFileAlt /></span>
        <div>
          <div style={{ fontSize: 15, color: "#888", fontWeight: 600 }}>Download Sales Report</div>
          <div style={{ fontSize: 15, color: "#1565c0", fontWeight: 700, cursor: "pointer" }}><FaDownload /> Download</div>
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
        <span style={{ fontSize: 32, color: "#f9a825" }}><FaChartPie /></span>
        <div>
          <div style={{ fontSize: 15, color: "#888", fontWeight: 600 }}>Analytics Dashboard</div>
          <div style={{ fontSize: 15, color: "#1565c0", fontWeight: 700, cursor: "pointer" }}>View</div>
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
        Recent Reports
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
        <thead>
          <tr style={{ background: "#f6f7fb", color: "#232526" }}>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Type</th>
            <th style={{ padding: "10px 12px", textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px 12px" }}>{r.name}</td>
              <td style={{ padding: "10px 12px" }}>{r.date}</td>
              <td style={{ padding: "10px 12px" }}>{r.type}</td>
              <td style={{
                padding: "10px 12px",
                textAlign: "center",
                color: "#2e7d32",
                fontWeight: 600
              }}>
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ color: "#888", fontSize: 14, marginTop: 12 }}>
      For more reports, use the <span style={{ color: "#1565c0", fontWeight: 600, cursor: "pointer" }}>Reports Generator</span>.
    </div>
  </section>
);

export default SellerReportsPage;
