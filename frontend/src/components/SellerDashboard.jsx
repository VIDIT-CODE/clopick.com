import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaBoxOpen, FaList, FaMoneyBill, FaChartLine, FaBullhorn, FaEnvelope, FaFileAlt, FaHeadset, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import SellerHomePage from "./SellerHomePage";
import AddProductPage from "./AddProductPage";
import OrdersPage from "./OrdersPage";
import MyProductsPage from "./MyProductsPage";
import SellerPaymentsPage from "./SellerPaymentsPage";
import SellerPerformancePage from "./SellerPerformancePage";
import SellerAdvertisingPage from "./SellerAdvertisingPage";
import SellerMessagesPage from "./SellerMessagesPage";
import SellerReportsPage from "./SellerReportsPage";
import SellerSupportPage from "./SellerSupportPage";

// Chart.js registration (required for all chart components)
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

// Sidebar link component
function SidebarLink({ icon, label, onClick }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "0.7rem 2rem",
        fontWeight: 600,
        fontSize: "1.08rem",
        cursor: "pointer",
        transition: "background 0.15s",
        borderLeft: "4px solid transparent"
      }}
      onMouseOver={e => e.currentTarget.style.background = "#414345"}
      onMouseOut={e => e.currentTarget.style.background = "none"}
      onClick={onClick}
    >
      <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

const SellerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [section, setSection] = React.useState("dashboard");
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Seller info
  const seller =
    location.state?.seller ||
    (() => {
      try {
        const stored = localStorage.getItem("clopick_seller");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    })();

  React.useEffect(() => {
    if (location.state?.seller) {
      localStorage.setItem("clopick_seller", JSON.stringify(location.state.seller));
    }
    if (!seller) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, [location.state, navigate]);

  if (!seller) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f6f7fb",
      padding: 0,
      margin: 0,
      width: "100vw",
      display: "flex",
      // Remove sidebar from layout in mobile view
    }}>
      {/* Sidebar for desktop */}
      <aside
        style={{
          width: 220,
          background: "#232526",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          padding: 0,
          position: "sticky",
          top: 0,
          zIndex: 1001,
        }}
        className="seller-dashboard-sidebar"
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: "2rem",
          position: "relative",
          padding: "1.5rem 0 1rem 0",
        }}>
          {/* Hamburger for mobile (inside sidebar for alignment) */}
          <button
            className="seller-dashboard-hamburger"
            style={{
              display: "none",
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "#232526",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.7rem",
              fontSize: "1.7rem",
              boxShadow: "0 2px 8px #23252644",
              cursor: "pointer",
            }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
          {/* Shift logo to the right of hamburger */}
          <div style={{ marginLeft: 48, display: "flex", alignItems: "center" }}>
            <img
              src={process.env.PUBLIC_URL + "/CLOPICK-logo.png"}
              alt="CLOPICK Logo"
              style={{
                height: "42px",
                width: "auto",
                background: "#fff",
                borderRadius: "8px",
                padding: "4px",
                marginRight: 0,
                zIndex: 2,
                position: "relative",
              }}
            />
            {/* Removed "Seller" text */}
          </div>
        </div>
        <nav style={{ flex: 1 }}>
          <SidebarLink icon={<FaHome />} label="Home" onClick={() => { setSection("dashboard"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaBoxOpen />} label="Add a Product" onClick={() => { setSection("addProduct"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaList />} label="My Products" onClick={() => { setSection("myProducts"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaBoxOpen />} label="Orders" onClick={() => { setSection("orders"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaMoneyBill />} label="Payments" onClick={() => { setSection("payments"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaChartLine />} label="Performance" onClick={() => { setSection("performance"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaBullhorn />} label="Advertising" onClick={() => { setSection("advertising"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaEnvelope />} label="Messages" onClick={() => { setSection("messages"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaFileAlt />} label="Reports" onClick={() => { setSection("reports"); setSelectedOrder(null); }} />
          <SidebarLink icon={<FaHeadset />} label="Support" onClick={() => { setSection("support"); setSelectedOrder(null); }} />
        </nav>
        {/* Removed logout button at bottom */}
      </aside>
      {/* Hamburger for mobile (fixed for mobile view) */}
      <button
        className="seller-dashboard-hamburger"
        style={{
          display: "none",
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1002,
          background: "#232526",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "0.7rem",
          fontSize: "1.7rem",
          boxShadow: "0 2px 8px #23252644",
          cursor: "pointer",
        }}
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <FaBars />
      </button>
      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div
          className="seller-dashboard-mobile-sidebar"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "75vw",
            maxWidth: 340,
            height: "100vh",
            background: "#232526",
            color: "#fff",
            zIndex: 2001,
            boxShadow: "2px 0 16px #23252644",
            display: "flex",
            flexDirection: "column",
            padding: "2rem 1.2rem 1.2rem 1.2rem",
            animation: "slideInLeft 0.22s cubic-bezier(.4,2,.6,1)",
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              alignSelf: "flex-end",
              marginBottom: "1.5rem",
              cursor: "pointer",
            }}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <nav>
            <SidebarLink icon={<FaHome />} label="Home" onClick={() => { setSection("dashboard"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaBoxOpen />} label="Add a Product" onClick={() => { setSection("addProduct"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaList />} label="My Products" onClick={() => { setSection("myProducts"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaBoxOpen />} label="Orders" onClick={() => { setSection("orders"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaMoneyBill />} label="Payments" onClick={() => { setSection("payments"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaChartLine />} label="Performance" onClick={() => { setSection("performance"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaBullhorn />} label="Advertising" onClick={() => { setSection("advertising"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaEnvelope />} label="Messages" onClick={() => { setSection("messages"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaFileAlt />} label="Reports" onClick={() => { setSection("reports"); setSelectedOrder(null); setSidebarOpen(false); }} />
            <SidebarLink icon={<FaHeadset />} label="Support" onClick={() => { setSection("support"); setSelectedOrder(null); setSidebarOpen(false); }} />
          </nav>
          <button
            onClick={() => {
              localStorage.removeItem("clopick_seller");
              navigate("/", { replace: true });
              setSidebarOpen(false);
            }}
            style={{
              background: "#fff",
              color: "#232526",
              border: "none",
              borderRadius: "8px",
              padding: "0.5rem 1.2rem",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              margin: "2rem 0 0 0",
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "80%",
              justifyContent: "center"
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#0008",
            zIndex: 2000,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          // Remove black sidebar in mobile view
        }}
      >
        {/* Top Navbar */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            color: "#232526",
            padding: "0.7rem 2.5rem",
            borderBottom: "2px solid #e0e0e0",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            minHeight: 64,
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem"
          }}>
            {/* Hamburger for mobile view, visible only on small screens */}
            <button
              className="seller-dashboard-hamburger"
              style={{
                display: "none",
                background: "#232526",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "0.7rem",
                fontSize: "1.7rem",
                boxShadow: "0 2px 8px #23252644",
                cursor: "pointer",
                marginRight: "0.8rem"
              }}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
            <span style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: "1px" }}>
              CLOPICK Seller Central
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FaUserCircle size={28} />
              <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                {seller.businessName || seller.name || seller.email || "Seller"}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("clopick_seller");
                  navigate("/", { replace: true });
                }}
                style={{
                  background: "#fff",
                  color: "#d32f2f",
                  border: "1px solid #d32f2f",
                  borderRadius: "6px",
                  padding: "0.3rem 0.9rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginLeft: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                title="Logout"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </nav>
        {/* Main Section Switch */}
        <main style={{ padding: "2.5rem", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          {section === "orders" ? (
            <OrdersPage
              seller={seller}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              setSection={setSection}
            />
          ) : section === "addProduct" ? (
            <AddProductPage />
          ) : section === "myProducts" ? (
            <MyProductsPage seller={seller} />
          ) : section === "payments" ? (
            <SellerPaymentsPage seller={seller} />
          ) : section === "performance" ? (
            <SellerPerformancePage seller={seller} />
          ) : section === "advertising" ? (
            <SellerAdvertisingPage seller={seller} />
          ) : section === "messages" ? (
            <SellerMessagesPage seller={seller} />
          ) : section === "reports" ? (
            <SellerReportsPage seller={seller} />
          ) : section === "support" ? (
            <SellerSupportPage seller={seller} />
          ) : (
            <SellerHomePage seller={seller} />
          )}
        </main>
        <footer
          style={{
            background: "#232526",
            color: "#fff",
            textAlign: "center",
            padding: "1.2rem",
            marginTop: "2rem",
          }}
        >
          &copy; {new Date().getFullYear()} CLOPICK Seller Central. All rights reserved.
        </footer>
      </div>
      {/* Responsive styles */}
      <style>
        {`
        @keyframes slideInLeft {
          from { left: -340px; opacity: 0; }
          to { left: 0; opacity: 1; }
        }
        @media (max-width: 1100px) {
          .seller-dashboard-sidebar {
            display: none !important;
          }
          .seller-dashboard-hamburger {
            display: block !important;
          }
          /* Remove sidebar space in layout */
          div[style*="display: flex"][style*="width: 100vw"] {
            flex-direction: column !important;
          }
        }
        @media (max-width: 900px) {
          .seller-dashboard-sidebar {
            display: none !important;
          }
          .seller-dashboard-hamburger {
            display: block !important;
            position: static !important;
            margin-right: 0.6rem !important;
          }
          div[style*="display: flex"][style*="width: 100vw"] {
            flex-direction: column !important;
          }
          main {
            padding: 1rem !important;
          }
        }
        @media (max-width: 600px) {
          .seller-dashboard-hamburger {
            display: block !important;
            position: static !important;
            margin-right: 0.5rem !important;
          }
          div[style*="display: flex"][style*="width: 100vw"] {
            flex-direction: column !important;
          }
          main {
            padding: 0.5rem !important;
          }
          section, .MetricCard {
            padding: 1rem !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default SellerDashboard;

