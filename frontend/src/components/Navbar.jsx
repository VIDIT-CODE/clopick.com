import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import logo from "./CLOPICK-logo.png";
import "./Navbar.css";
import RegistrationModal from "./RegistrationModal";
import SellerAuthModal from "./SellerAuthModal";
import MyOrders from "./MyOrders";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler } from "chart.js";

// Register Filler plugin for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("register");
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customer, setCustomer] = useState(() => {
    try {
      const stored = localStorage.getItem("clopick_customer");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Update customer state when modals close or on storage change
  useEffect(() => {
    const updateCustomer = () => {
      try {
        const stored = localStorage.getItem("clopick_customer");
        setCustomer(stored ? JSON.parse(stored) : null);
      } catch {
        setCustomer(null);
      }
    };
    updateCustomer();
    window.addEventListener("storage", updateCustomer);
    return () => window.removeEventListener("storage", updateCustomer);
  }, [showModal, showSellerModal]);

  // Lock background scroll when modal or sidebar is open
  useEffect(() => {
    document.body.style.overflow = showModal || showSellerModal || sidebarOpen ? "hidden" : "auto";
  }, [showModal, showSellerModal, sidebarOpen]);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = (e) => {
      if (
        !e.target.closest(".navbar-user-icon") &&
        !e.target.closest(".navbar-user-menu")
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <nav
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
          color: "#fff",
          padding: "0.7rem 0",
          boxShadow: "0 2px 16px rgba(44,62,80,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: "2px solid #fff",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1800px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2vw",
            gap: "2.5rem",
          }}
        >
          {/* Logo on extreme left */}
          <div style={{ flexShrink: 0 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginLeft: 0,
              }}
            >
              <img
                src={logo}
                alt="CLOPICK Logo"
                className="logo"
                style={{
                  height: "42px",
                  width: "auto",
                  display: "block",
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  filter: "none",
                }}
              />
            </Link>
          </div>
          {/* Hamburger icon for mobile */}
          <button
            className="navbar-hamburger"
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              display: "none",
              cursor: "pointer",
            }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
          {/* Sections - always in one line, centered */}
          <div
            className="navbar-links"
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              minWidth: 0,
              whiteSpace: "nowrap",
              flexWrap: "nowrap",
            }}
          >
            <Link
              to="/"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Home
            </Link>
            <Link
              to="/category/shirts"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Shirts
            </Link>
            <Link
              to="/category/tshirts"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              T-Shirts
            </Link>
            <Link
              to="/category/jeans"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Jeans
            </Link>
            <Link
              to="/category/jackets"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Jackets
            </Link>
            <Link
              to="/category/hoodies"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Hoodies
            </Link>
            <Link
              to="/category/cargos"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Cargos
            </Link>
            <Link
              to="/category/ethnic"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Ethnic Wear
            </Link>
            <Link
              to="/category/footwear"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "1.08rem",
                whiteSpace: "nowrap",
              }}
            >
              Footwear
            </Link>
          </div>
          {/* Right side: Cart, Register, Login, Sell */}
          <div
            className="navbar-actions"
            style={{
              display: "flex",
              gap: "2.5rem",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            {/* Cart button only for logged-in customers */}
            {customer && (
              <Link
                to="/cart"
                style={{
                  color: "#111",
                  background: "#00fff7",
                  borderRadius: "6px",
                  padding: "0.4rem 1.1rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "1.08rem",
                  boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                  textShadow: "0 0 8px #fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  role="img"
                  aria-label="cart"
                  style={{ marginRight: "0.3rem" }}
                >
                  🛒
                </span>
                Cart
              </Link>
            )}
            {/* Register, Login, and Logout buttons */}
            {!customer ? (
              <>
                <button
                  onClick={() => {
                    setModalMode("register");
                    setShowModal(true);
                  }}
                  style={{
                    color: "#111",
                    background: "#00fff7",
                    borderRadius: "6px",
                    padding: "0.4rem 1.1rem",
                    fontWeight: 700,
                    fontSize: "1.08rem",
                    cursor: "pointer",
                    marginRight: "0.5rem",
                    border: "none",
                    boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                    textShadow: "0 0 8px #fff",
                  }}
                >
                  Register
                </button>
                <button
                  onClick={() => {
                    setModalMode("login");
                    setShowModal(true);
                  }}
                  style={{
                    color: "#111",
                    background: "#00fff7",
                    borderRadius: "6px",
                    padding: "0.4rem 1.1rem",
                    fontWeight: 700,
                    fontSize: "1.08rem",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                    textShadow: "0 0 8px #fff",
                    border: "none",
                  }}
                >
                  Login
                </button>
              </>
            ) : (
                // Only show Logout and user icon together, but user icon only once at the rightmost
                <>
                  <button
                    onClick={() => {
                      localStorage.removeItem("clopick_customer");
                      setCustomer(null);
                      window.dispatchEvent(new Event("storage"));
                      navigate("/");
                    }}
                    style={{
                      color: "#111",
                      background: "#00fff7",
                      borderRadius: "6px",
                      padding: "0.4rem 1.1rem",
                      fontWeight: 700,
                      fontSize: "1.08rem",
                      cursor: "pointer",
                      border: "none",
                      marginLeft: "0.5rem",
                      boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                      textShadow: "0 0 8px #fff",
                    }}
                  >
                    Logout
                  </button>
                </>
            )}
            <button
              onClick={() => {
                setShowSellerModal(true);
              }}
              style={{
                color: "#111",
                background: "#00fff7",
                borderRadius: "6px",
                padding: "0.4rem 1.1rem",
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                textShadow: "0 0 8px #fff",
                border: "none",
              }}
            >
              Sell
            </button>
            {/* User icon at the rightmost side when logged in */}
            {customer && (
              <span
                className="navbar-user-icon"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "1.2rem",
                  background: "#fff",
                  borderRadius: "50%",
                  width: 38,
                  height: 38,
                  boxShadow: "0 2px 8px #e0e0e0",
                  cursor: "pointer",
                  position: "relative",
                }}
                title={customer?.name || "User"}
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                <FaUser style={{ color: "#232526", fontSize: "1.4rem" }} />
              </span>
            )}
          </div>
        </div>
      </nav>
      {/* User menu dropdown */}
      {userMenuOpen && (
        <div
          className="navbar-user-menu"
          style={{
            position: "absolute",
            top: 64,
            right: 32,
            minWidth: 220,
            background: "#fff",
            boxShadow: "0 8px 32px 0 rgba(44,62,80,0.13), 0 2px 12px #e0e7ef",
            zIndex: 2001,
            borderRadius: 12,
            padding: "1.1rem 0.7rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            animation: "fadeInUserMenu 0.18s",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#232526", paddingLeft: 8 }}>
            {customer?.name ? `Hello, ${customer.name}` : "My Account"}
          </div>
          <Link
            to="/orders"
            style={{
              color: "#232526",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: "0.2rem 0",
              padding: "0.6rem 0.7rem",
              borderRadius: "7px",
              background: "#f6f7fb",
              transition: "background 0.15s",
              display: "block",
            }}
            onClick={() => setUserMenuOpen(false)}
          >
            My Orders
          </Link>
          <Link
            to="/profile"
            style={{
              color: "#232526",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: "0.2rem 0",
              padding: "0.6rem 0.7rem",
              borderRadius: "7px",
              background: "#f6f7fb",
              transition: "background 0.15s",
              display: "block",
            }}
            onClick={() => setUserMenuOpen(false)}
          >
            My Account
          </Link>
          <Link
            to="/wishlist"
            style={{
              color: "#232526",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: "0.2rem 0",
              padding: "0.6rem 0.7rem",
              borderRadius: "7px",
              background: "#f6f7fb",
              transition: "background 0.15s",
              display: "block",
            }}
            onClick={() => setUserMenuOpen(false)}
          >
            Wishlist
          </Link>
          <Link
            to="/addresses"
            style={{
              color: "#232526",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: "0.2rem 0",
              padding: "0.6rem 0.7rem",
              borderRadius: "7px",
              background: "#f6f7fb",
              transition: "background 0.15s",
              display: "block",
            }}
            onClick={() => setUserMenuOpen(false)}
          >
            Manage Addresses
          </Link>
          <Link
            to="/payments"
            style={{
              color: "#232526",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: "0.2rem 0",
              padding: "0.6rem 0.7rem",
              borderRadius: "7px",
              background: "#f6f7fb",
              transition: "background 0.15s",
              display: "block",
            }}
            onClick={() => setUserMenuOpen(false)}
          >
            Payment Options
          </Link>
          <Link
            to="/customer-support"
            style={{
              color: "#232526",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              margin: "0.2rem 0",
              padding: "0.6rem 0.7rem",
              borderRadius: "7px",
              background: "#f6f7fb",
              transition: "background 0.15s",
              display: "block",
            }}
            onClick={() => setUserMenuOpen(false)}
          >
            Customer Support
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("clopick_customer");
              setCustomer(null);
              window.dispatchEvent(new Event("storage"));
              setUserMenuOpen(false);
              navigate("/");
            }}
            style={{
              color: "#fff",
              background: "#232526",
              borderRadius: "7px",
              padding: "0.6rem 0.7rem",
              fontWeight: 700,
              fontSize: "1.05rem",
              cursor: "pointer",
              border: "none",
              marginTop: "0.7rem",
              boxShadow: "0 2px 8px #23252622",
              transition: "background 0.15s",
            }}
          >
            Logout
          </button>
        </div>
      )}
      <style>
        {`
        @keyframes fadeInUserMenu {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: none;}
        }
        `}
      </style>
      {/* Sidebar Drawer for mobile */}
      <div
        className="navbar-sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-80vw",
          width: "75vw",
          maxWidth: 340,
          height: "100vh",
          background: "#232526",
          color: "#fff",
          zIndex: 9999,
          transition: "left 0.3s cubic-bezier(.4,2,.6,1)",
          boxShadow: sidebarOpen ? "2px 0 16px #23252644" : "none",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 1.2rem 1.2rem 1.2rem",
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
        <Link to="/" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>Home</Link>
        <Link to="/category/shirts" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>Shirts</Link>
        <Link to="/category/tshirts" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>T-Shirts</Link>
        <Link to="/category/jeans" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>Jeans</Link>
        <Link to="/category/jackets" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>Jackets</Link>
        <Link to="/category/hoodies" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>Hoodies</Link>
        <Link to="/category/cargos" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>Cargos</Link>
        <Link to="/category/ethnic" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>Ethnic Wear</Link>
        <Link to="/category/footwear" onClick={() => setSidebarOpen(false)} style={{ color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: "1.1rem", margin: "0.7rem 0" }}>Footwear</Link>
        <Link to="/cart" onClick={() => setSidebarOpen(false)} style={{ color: "#111", background: "#00fff7", borderRadius: "6px", padding: "0.5rem 1.2rem", fontWeight: 700, textDecoration: "none", fontSize: "1.08rem", margin: "1.2rem 0 0.5rem 0", display: "inline-block" }}>🛒 Cart</Link>
        {/* Register, Login, and Logout buttons */}
        {!customer ? (
          <>
            <button
              onClick={() => {
                setModalMode("register");
                setShowModal(true);
                setSidebarOpen(false);
              }}
              style={{ color: "#111", background: "#00fff7", borderRadius: "6px", padding: "0.5rem 1.2rem", fontWeight: 700, fontSize: "1.08rem", cursor: "pointer", border: "none", margin: "0.5rem 0", display: customer ? "none" : "block" }}
            >
              Register
            </button>
            <button
              onClick={() => {
                setModalMode("login");
                setShowModal(true);
                setSidebarOpen(false);
              }}
              style={{ color: "#111", background: "#00fff7", borderRadius: "6px", padding: "0.5rem 1.2rem", fontWeight: 700, fontSize: "1.08rem", cursor: "pointer", border: "none", margin: "0.5rem 0", display: customer ? "none" : "block" }}
            >
              Login
            </button>
          </>
        ) : (
            <button
              onClick={() => {
                localStorage.removeItem("clopick_customer");
                setCustomer(null);
                window.dispatchEvent(new Event("storage"));
                setSidebarOpen(false);
                navigate("/");
              }}
              style={{
                color: "#111",
                background: "#00fff7",
                borderRadius: "6px",
                padding: "0.5rem 1.2rem",
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: "pointer",
                border: "none",
                margin: "0.5rem 0",
                boxShadow: "0 2px 8px #00fff7, 0 2px 8px rgba(96,165,250,0.10)",
                textShadow: "0 0 8px #fff",
                display: "block"
              }}
            >
              Logout
            </button>
          )}
        <button
          onClick={() => {
            setShowSellerModal(true);
            setSidebarOpen(false);
          }}
          style={{ color: "#111", background: "#00fff7", borderRadius: "6px", padding: "0.5rem 1.2rem", fontWeight: 700, fontSize: "1.08rem", cursor: "pointer", border: "none", margin: "0.5rem 0" }}
        >
          Sell
        </button>
      </div>
      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="navbar-sidebar-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#0008",
            zIndex: 9998,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Responsive styles */}
      <style>
        {`
        @media (max-width: 1100px) {
          .navbar-links {
            gap: 1.2rem !important;
          }
          .navbar-actions {
            gap: 1.2rem !important;
          }
        }
        @media (max-width: 900px) {
          .navbar-links {
            gap: 0.7rem !important;
          }
          .navbar-actions {
            gap: 0.7rem !important;
          }
        }
        @media (max-width: 800px) {
          .navbar-links,
          .navbar-actions {
            display: none !important;
          }
          .navbar-hamburger {
            display: block !important;
          }
        }
        @media (min-width: 801px) {
          .navbar-hamburger {
            display: none !important;
          }
        }
        .navbar-sidebar {
          scrollbar-width: thin;
        }
        `}
      </style>
      {/* ...existing modals... */}
      {showModal && (
        <RegistrationModal
          onClose={() => setShowModal(false)}
          mode={modalMode}
        />
      )}
      {showSellerModal && (
        <SellerAuthModal
          onClose={() => setShowSellerModal(false)}
        />
      )}
      {/* Place this at the root of your app, not inside Navbar if possible */}
      <Routes>
        {/* ...other routes... */}
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
    </>
  );
};

export default Navbar;
