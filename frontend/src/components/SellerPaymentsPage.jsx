import React from "react";
import { FaWallet, FaMoneyCheckAlt, FaArrowDown, FaArrowUp, FaRegCalendarAlt } from "react-icons/fa";

const summaryData = [
  {
    label: "Current Balance",
    value: "₹12,500.00",
    icon: <FaWallet />,
    color: "#2e7d32",
  },
  {
    label: "Last Payout",
    value: "₹7,200.00",
    icon: <FaMoneyCheckAlt />,
    color: "#1565c0",
    sub: "on 2024-06-10",
  },
  {
    label: "Upcoming Payout",
    value: "₹5,300.00",
    icon: <FaRegCalendarAlt />,
    color: "#f9a825",
    sub: "on 2024-06-17",
  },
];

const transactions = [
  {
    date: "2024-06-12",
    type: "Order Payment",
    amount: "+₹2,500.00",
    status: "Completed",
    details: "Order #12345",
  },
  {
    date: "2024-06-10",
    type: "Payout",
    amount: "-₹7,200.00",
    status: "Transferred",
    details: "Bank: HDFC ****1234",
  },
  {
    date: "2024-06-09",
    type: "Fee",
    amount: "-₹300.00",
    status: "Deducted",
    details: "Commission Fee",
  },
  {
    date: "2024-06-08",
    type: "Order Payment",
    amount: "+₹3,000.00",
    status: "Completed",
    details: "Order #12312",
  },
  {
    date: "2024-06-07",
    type: "Refund",
    amount: "-₹500.00",
    status: "Refunded",
    details: "Order #12298",
  },
];

const SellerPaymentsPage = ({ seller }) => (
  <section style={{ width: "100%" }}>
    <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: 18, color: "#232526" }}>
      Payments Overview
    </h2>
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 36 }}>
      {summaryData.map((item, idx) => (
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
            {item.sub && <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{item.sub}</div>}
          </div>
        </div>
      ))}
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
        Recent Transactions
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
        <thead>
          <tr style={{ background: "#f6f7fb", color: "#232526" }}>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Date</th>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Type</th>
            <th style={{ padding: "10px 12px", textAlign: "left" }}>Details</th>
            <th style={{ padding: "10px 12px", textAlign: "right" }}>Amount</th>
            <th style={{ padding: "10px 12px", textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px 12px" }}>{txn.date}</td>
              <td style={{ padding: "10px 12px" }}>{txn.type}</td>
              <td style={{ padding: "10px 12px" }}>{txn.details}</td>
              <td style={{
                padding: "10px 12px",
                textAlign: "right",
                color: txn.amount.startsWith("+") ? "#2e7d32" : "#d32f2f",
                fontWeight: 700
              }}>
                {txn.amount}
              </td>
              <td style={{
                padding: "10px 12px",
                textAlign: "center",
                color:
                  txn.status === "Completed" || txn.status === "Transferred"
                    ? "#2e7d32"
                    : txn.status === "Refunded"
                    ? "#f9a825"
                    : "#888",
                fontWeight: 600
              }}>
                {txn.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ color: "#888", fontSize: 14, marginTop: 12 }}>
      For detailed payment reports, visit the <span style={{ color: "#1565c0", fontWeight: 600, cursor: "pointer" }}>Reports</span> section.
    </div>
  </section>
);

export default SellerPaymentsPage;
