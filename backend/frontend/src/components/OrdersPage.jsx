import React from "react";

const OrdersPage = ({ seller, selectedOrder, setSelectedOrder, setSection }) => {
  // Dummy orders data for demonstration
  const [orders] = React.useState([
    {
      id: "1001",
      date: "2024-05-01",
      status: "Pending",
      buyer: "John Doe",
      amount: 2500,
      product: "Sample Product",
      address: "123 Main St, City",
      phone: "9876543210",
      details: "Size: L, Color: Blue",
      items: [{ name: "Sample Product", qty: 1, price: 2500 }]
    },
    {
      id: "1000",
      date: "2024-04-28",
      status: "Shipped",
      buyer: "Jane Smith",
      amount: 1200,
      product: "Sample Product 2",
      address: "456 Market Rd, City",
      phone: "9123456780",
      details: "Size: M, Color: Black",
      items: [{ name: "Sample Product 2", qty: 1, price: 1200 }]
    }
  ]);
  const [search, setSearch] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      search === "" ||
      order.id.includes(search) ||
      order.buyer.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase());
    const matchesFrom = !dateFrom || order.date >= dateFrom;
    const matchesTo = !dateTo || order.date <= dateTo;
    return matchesSearch && matchesFrom && matchesTo;
  });

  if (selectedOrder) {
    // Order details view
    return (
      <div style={{ background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 1px 6px #23252611" }}>
        <button
          onClick={() => setSelectedOrder(null)}
          style={{
            marginBottom: "1rem",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1.2rem",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          &larr; Back to Orders
        </button>
        <h2 style={{ fontWeight: 800, marginBottom: "1rem" }}>Order #{selectedOrder.id}</h2>
        <div style={{ marginBottom: "1rem" }}>
          <b>Status:</b> <span style={{ color: selectedOrder.status === "Pending" ? "#ff9800" : "#388e3c" }}>{selectedOrder.status}</span>
        </div>
        <div><b>Date:</b> {selectedOrder.date}</div>
        <div><b>Buyer:</b> {selectedOrder.buyer}</div>
        <div><b>Phone:</b> {selectedOrder.phone}</div>
        <div><b>Address:</b> {selectedOrder.address}</div>
        <div><b>Product:</b> {selectedOrder.product}</div>
        <div><b>Details:</b> {selectedOrder.details}</div>
        <div><b>Amount:</b> ₹{selectedOrder.amount}</div>
        <div style={{ marginTop: "1rem" }}>
          <b>Items:</b>
          <ul>
            {selectedOrder.items.map((item, idx) => (
              <li key={idx}>{item.name} (Qty: {item.qty}) - ₹{item.price}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  // Orders list view
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 1px 6px #23252611" }}>
      <h2 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>Orders</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search by Order ID, Buyer, Product"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc", minWidth: 220 }}
        />
        <input
          type="date"
          value={dateFrom}
          onChange={e => setDateFrom(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="date"
          value={dateTo}
          onChange={e => setDateTo(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "1.05rem" }}>
        <thead>
          <tr style={{ background: "#f6f7fb" }}>
            <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Order ID</th>
            <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Date</th>
            <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Buyer</th>
            <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Product</th>
            <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Status</th>
            <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee", textAlign: "left" }}>Amount</th>
            <th style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "1.5rem", color: "#888" }}>No orders found.</td>
            </tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order.id} style={{ cursor: "pointer" }}>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>{order.id}</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>{order.date}</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>{order.buyer}</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>{order.product}</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>
                  <span style={{ color: order.status === "Pending" ? "#ff9800" : "#388e3c", fontWeight: 600 }}>{order.status}</span>
                </td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>₹{order.amount}</td>
                <td style={{ padding: "0.7rem", borderBottom: "1px solid #eee" }}>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      background: "#1976d2",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.4rem 1rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
