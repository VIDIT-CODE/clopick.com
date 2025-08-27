import React from "react";
import { FaEnvelopeOpenText, FaUserCircle } from "react-icons/fa";

const messages = [
  {
    from: "Customer Support",
    subject: "Order #12345 - Inquiry",
    date: "2024-06-12",
    snippet: "Hello, I have a question about my recent order...",
    unread: true,
  },
  {
    from: "Buyer: Priya S.",
    subject: "Product Availability",
    date: "2024-06-11",
    snippet: "Is the blue variant of your product in stock?",
    unread: false,
  },
  {
    from: "System",
    subject: "Payout Processed",
    date: "2024-06-10",
    snippet: "Your payout of ₹7,200 has been processed.",
    unread: false,
  },
];

const SellerMessagesPage = () => (
  <section style={{ width: "100%" }}>
    <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: 18, color: "#232526" }}>
      Messages & Inbox
    </h2>
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(44,62,80,0.07)",
      padding: "2rem",
      marginBottom: 24,
      minHeight: 320,
    }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18, color: "#232526" }}>
        Recent Messages
      </div>
      <div>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            padding: "1rem 0",
            borderBottom: idx !== messages.length - 1 ? "1px solid #eee" : "none",
            background: msg.unread ? "#f6f7fb" : "none",
          }}>
            <FaUserCircle size={32} color="#1976d2" style={{ marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: msg.unread ? 700 : 600, color: "#232526", fontSize: 16 }}>
                {msg.subject}
              </div>
              <div style={{ color: "#888", fontSize: 14, margin: "2px 0 4px 0" }}>
                From: {msg.from} &nbsp;|&nbsp; {msg.date}
              </div>
              <div style={{ color: "#444", fontSize: 15 }}>{msg.snippet}</div>
            </div>
            {msg.unread && (
              <span style={{
                background: "#1976d2",
                color: "#fff",
                borderRadius: 8,
                padding: "2px 10px",
                fontSize: 13,
                fontWeight: 700,
                alignSelf: "center"
              }}>NEW</span>
            )}
          </div>
        ))}
      </div>
    </div>
    <div style={{ color: "#888", fontSize: 14, marginTop: 12 }}>
      For full conversation history, visit the <span style={{ color: "#1565c0", fontWeight: 600, cursor: "pointer" }}>Messages Center</span>.
    </div>
  </section>
);

export default SellerMessagesPage;
