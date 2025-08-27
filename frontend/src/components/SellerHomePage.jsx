import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { FaBoxOpen, FaList, FaMoneyBill, FaChartLine } from "react-icons/fa";

// MetricCard and ActionButton can be moved to their own files if desired
function MetricCard({ title, value, sub, trend, color }) {
  return (
    <div style={{
      flex: "1 1 220px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 1px 6px #23252611",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      minWidth: 220,
    }}>
      <div style={{ fontSize: "1.1rem", color: "#555", marginBottom: "0.5rem" }}>
        {title}
      </div>
      <div style={{ fontSize: "1.8rem", fontWeight: 700, color: color ?? "#1976d2", marginBottom: "0.3rem" }}>
        {value}
      </div>
      <div style={{ fontSize: "1rem", color: "#888" }}>
        {sub}{" "}
        {trend && (
          <span style={{ color: trend.startsWith("+") ? "#388e3c" : "#d32f2f", fontWeight: 600 }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function ActionButton({ label, icon }) {
  return (
    <button
      style={{
        flex: "1 1 180px",
        background: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "0.8rem 1.2rem",
        fontWeight: 600,
        fontSize: "1rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "background 0.15s",
        minWidth: 180,
      }}
      onMouseOver={e => e.currentTarget.style.background = "#155a8a"}
      onMouseOut={e => e.currentTarget.style.background = "#1976d2"}
    >
      <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

const SellerHomePage = ({ seller }) => {
  // Chart data (can be moved to a separate file or fetched)
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales (₹)",
        data: [12000, 15000, 11000, 18000, 17000, 21000, 16000],
        fill: true,
        backgroundColor: "rgba(25, 118, 210, 0.08)",
        borderColor: "#1976d2",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#1976d2"
      }
    ]
  };

  const ordersData = {
    labels: ["Pending", "Shipped", "Delivered", "Returned"],
    datasets: [
      {
        label: "Orders",
        data: [8, 22, 120, 2],
        backgroundColor: ["#ff9800", "#1976d2", "#388e3c", "#d32f2f"],
        borderWidth: 1,
      }
    ]
  };

  const inventoryData = {
    labels: ["T-Shirts", "Shirts", "Jeans", "Jackets", "Others"],
    datasets: [
      {
        label: "Stock",
        data: [120, 80, 60, 30, 40],
        backgroundColor: [
          "#1976d2",
          "#388e3c",
          "#ff9800",
          "#d32f2f",
          "#7b1fa2"
        ],
        borderWidth: 1,
      }
    ]
  };

  return (
    <>
      {/* Metrics Row */}
      <section
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "2.5rem",
        }}
      >
        <MetricCard
          title="Today's Sales"
          value={`₹${seller.todaysSales ?? "12,500"}`}
          sub="vs yesterday"
          trend="+8%"
          color="#388e3c"
        />
        <MetricCard
          title="This Month"
          value={`₹${seller.monthSales ?? "2,10,000"}`}
          sub="vs last month"
          trend="+12%"
          color="#1976d2"
        />
        <MetricCard
          title="Pending Orders"
          value={seller.pendingOrders ?? 8}
          sub="to be shipped"
          trend=""
          color="#ff9800"
        />
        <MetricCard
          title="Returns"
          value={seller.returns ?? 1}
          sub="last 30 days"
          trend=""
          color="#d32f2f"
        />
      </section>
      {/* Charts Row */}
      <section style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        <div style={{
          flex: "2 1 400px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 6px #23252611",
          padding: "2rem",
          minWidth: "320px",
          minHeight: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
          <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
            Sales Trend (This Week)
          </h2>
          <div style={{ width: "100%", height: 200 }}>
            <Line data={salesData} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, ticks: { color: "#232526" } }, x: { ticks: { color: "#232526" } } }
            }} />
          </div>
        </div>
        <div style={{
          flex: "1 1 320px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 6px #23252611",
          padding: "2rem",
          minWidth: "320px",
          minHeight: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
          <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
            Orders Status
          </h2>
          <div style={{ width: "100%", height: 200 }}>
            <Doughnut data={ordersData} options={{
              responsive: true,
              plugins: { legend: { position: "bottom", labels: { color: "#232526" } } }
            }} />
          </div>
        </div>
        <div style={{
          flex: "1 1 320px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 6px #23252611",
          padding: "2rem",
          minWidth: "320px",
          minHeight: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
          <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
            Inventory Overview
          </h2>
          <div style={{ width: "100%", height: 200 }}>
            <Bar data={inventoryData} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, ticks: { color: "#232526" } }, x: { ticks: { color: "#232526" } } }
            }} />
          </div>
        </div>
      </section>
      {/* Account Health, Seller Rating & Announcements */}
      <section style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        <div style={{
          flex: "1 1 320px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 6px #23252611",
          padding: "2rem",
          minWidth: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
          <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
            Seller Rating
          </h2>
          <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
            <b>Feedback Score:</b> {seller.feedbackScore ?? "4.8/5.0"}
          </div>
          <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
            <b>Positive Feedback:</b> {seller.positiveFeedback ?? "98%"}
          </div>
          <div style={{ fontSize: "1.1rem", color: "#232526", marginBottom: "0.7rem" }}>
            <b>Messages:</b> {seller.newMessages ?? 2} new
          </div>
          <div style={{ fontSize: "1.1rem", color: "#232526" }}>
            <b>Reviews:</b> {seller.newReviews ?? 5} new
          </div>
        </div>
        <div style={{
          flex: "2 1 400px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 6px #23252611",
          padding: "2rem",
          minWidth: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
          <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
            Announcements
          </h2>
          <ul style={{ color: "#555", fontSize: "1.08rem", paddingLeft: "1.2rem" }}>
            <li>Welcome to CLOPICK Seller Central! Start listing your products to reach more customers.</li>
            <li>Check your performance dashboard for new analytics and insights.</li>
            <li>Need help? Visit the Support section or contact our team.</li>
          </ul>
        </div>
      </section>
      {/* Quick Actions */}
      <section
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 6px #23252611",
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <ActionButton label="Add Product" icon={<FaBoxOpen />} />
          <ActionButton label="View Orders" icon={<FaList />} />
          <ActionButton label="Payments" icon={<FaMoneyBill />} />
          <ActionButton label="Analytics" icon={<FaChartLine />} />
        </div>
      </section>
      {/* Recent Orders Table */}
      <section
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 1px 6px #23252611",
          padding: "2rem",
          marginBottom: "2.5rem",
          overflowX: "auto"
        }}
      >
        <h2 style={{ color: "#232526", fontWeight: 800, marginBottom: "1.2rem" }}>
          Recent Orders
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "1.05rem",
            minWidth: 600,
          }}
        >
          <thead>
            <tr style={{ background: "#f6f7fb" }}>
              <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Order ID</th>
              <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Product</th>
              <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Date</th>
              <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Status</th>
              <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>#1001</td>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>Sample Product</td>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>2024-05-01</td>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}><span style={{ color: "#ff9800", fontWeight: 600 }}>Pending</span></td>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>₹2,500</td>
            </tr>
            <tr>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>#1000</td>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>Sample Product 2</td>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>2024-04-28</td>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}><span style={{ color: "#388e3c", fontWeight: 600 }}>Shipped</span></td>
              <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>₹1,200</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default SellerHomePage;
