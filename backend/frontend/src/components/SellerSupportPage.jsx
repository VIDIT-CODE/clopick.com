import React from "react";
import { FaHeadset, FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const tickets = [
  { id: "TCK-1001", subject: "Order not delivered", date: "2024-06-12", status: "Open" },
  { id: "TCK-0998", subject: "Payment issue", date: "2024-06-10", status: "Resolved" },
  { id: "TCK-0995", subject: "Product listing help", date: "2024-06-08", status: "Closed" },
];

const SellerSupportPage = () => (
  <section style={{ width: "100%" }}>
    <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: 18, color: "#232526" }}>
      Support & Help Center
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
        <span style={{ fontSize: 32, color: "#1976d2" }}><FaHeadset /></span>
        <div>
          <div style={{ fontSize: 15, color: "#888", fontWeight: 600 }}>Contact Support</div>
          <div style={{ fontSize: 15, color: "#1565c0", fontWeight: 700, cursor: "pointer" }}>Open Ticket</div>
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
        <span style={{ fontSize: 32, color: "#f9a825" }}><FaQuestionCircle /></span>
        <div>
          <div style={{ fontSize: 15, color: "#888", fontWeight: 600 }}>FAQs</div>
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
        My Support Tickets
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
        <thead>
          <tr style={{ background: "#f6f7fb", color: "#232526" }}>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Ticket ID</th>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Subject</th>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "10px 12px", textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px 12px" }}>{t.id}</td>
              <td style={{ padding: "10px 12px" }}>{t.subject}</td>
              <td style={{ padding: "10px 12px" }}>{t.date}</td>
              <td style={{
                padding: "10px 12px",
                textAlign: "center",
                color:
                  t.status === "Open"
                    ? "#1976d2"
                    : t.status === "Resolved"
                    ? "#2e7d32"
                    : "#888",
                fontWeight: 600
              }}>
                {t.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ color: "#888", fontSize: 14, marginTop: 12 }}>
      For urgent issues, call our 24x7 helpline at <span style={{ color: "#1565c0", fontWeight: 600 }}>1800-123-4567</span>.
    </div>
  </section>
);

export default SellerSupportPage;
