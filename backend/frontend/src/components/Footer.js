import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import "./Footer.css"; // ⬅️ We'll add this next

const Footer = () => {
  return (
    <footer className="footer"
      style={{
        width: "100%",
        background: "#232526",
        color: "#fff",
        boxShadow: "0 -2px 24px rgba(44,62,80,0.13)",
        fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
        textAlign: "center",
        padding: "0",
        position: "relative",
        zIndex: 1,
        marginTop: "auto", // ensures footer sticks to the bottom of scroll
      }}
    >
      <div className="footer-content">
        {/* Column 1: Branding */}
        <div className="footer-column">
          <h2 className="footer-logo">Clopick</h2>
          <p>Your go-to destination for trendy men's fashion delivered fast.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Shop</Link></li>
            <li><Link to="/seller-auth">Sell With Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-column">
          <h3>Categories</h3>
          <ul>
            <li>Shirts</li>
            <li>T-Shirts</li>
            <li>Jeans</li>
            <li>Footwear</li>
          </ul>
        </div>

        {/* Column 4: Contact & Social */}
        <div className="footer-column">
          <h3>Connect</h3>
          <div className="footer-social">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
          <p>Email: support@clopick.com</p>
          <p>Phone: +91-9876543210</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Clopick. All rights reserved.
      </div>
      <style>
        {`
        @media (max-width: 600px) {
          .footer {
            position: relative !important;
            width: 100vw !important;
            box-shadow: 0 -2px 24px rgba(44,62,80,0.13) !important;
            margin-top: auto !important;
          }
          .footer-content {
            padding: 0.7rem 0.5rem !important;
            font-size: 0.92rem !important;
            gap: 0.5rem !important;
            flex-wrap: wrap !important;
          }
          .footer-column h2,
          .footer-column h3 {
            font-size: 1rem !important;
          }
          .footer-column p,
          .footer-column li,
          .footer-bottom {
            font-size: 0.85rem !important;
          }
          .footer-social svg {
            font-size: 1.1rem !important;
          }
        }
        `}
      </style>
    </footer>
  );
};

export default Footer;