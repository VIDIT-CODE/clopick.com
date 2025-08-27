import React from "react";

const MobileFooter = () => (
  <footer
    style={{
      width: "100vw",
      background: "#232526",
      color: "#fff",
      padding: "18px 6px 10px",
      margin: "0 auto",
      boxShadow: "0 -2px 24px rgba(44,62,80,0.13)",
      borderTop: "2px solid #00fff7",
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      borderRadius: "8px",
      marginTop: "1.5rem",
    }}
  >
    <div
      style={{
        maxWidth: "100vw",
        margin: "0 auto",
        padding: "0 0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.7rem",
      }}
      className="footer-content"
    >
      <div style={{ width: "100%" }}>
        <h2 style={{
          margin: 0,
          fontWeight: 700,
          fontSize: "0.95rem",
          letterSpacing: "1px",
          color: "#00fff7",
        }}>
          CLOPICK
        </h2>
        <p style={{
          margin: "0.5rem 0 0 0",
          color: "#e0e7ef",
          fontSize: "0.85rem",
          lineHeight: 1.5
        }}>
          Your destination for the latest and trendiest men's fashion.
        </p>
      </div>
      <div style={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center" }}>
          <a href="/" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.85rem",
            transition: "color 0.2s"
          }}>Home</a>
          <a href="/cart" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.85rem",
            transition: "color 0.2s"
          }}>Cart</a>
          <a href="/seller-auth" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.85rem",
            transition: "color 0.2s"
          }}>Sell</a>
        </div>
      </div>
      <div style={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <p style={{
          margin: 0,
          color: "#e0e7ef",
          fontSize: "0.85rem",
          lineHeight: 1.5
        }}>
          support@clopick.com | +91 98765 43210
        </p>
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.7rem", justifyContent: "center" }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style={{
              width: 14,
              filter: "invert(1)",
              transition: "transform 0.2s"
            }} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" style={{
              width: 14,
              filter: "invert(1)",
              transition: "transform 0.2s"
            }} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" style={{
              width: 14,
              filter: "invert(1)",
              transition: "transform 0.2s"
            }} />
          </a>
        </div>
      </div>
    </div>
    <div
      style={{
        textAlign: "center",
        color: "#00fff7",
        fontSize: "0.8rem",
        marginTop: "0.7rem",
        letterSpacing: "0.5px",
        borderTop: "1px solid #374151",
        paddingTop: "0.4rem",
        background: "#232526",
      }}
    >
      &copy; {new Date().getFullYear()} <span style={{ color: "#00fff7", fontWeight: 700 }}>CLOPICK</span>. All rights reserved.
    </div>
  </footer>
);

const DesktopFooter = () => (
  <footer
    style={{
      width: "100%",
      background: "#232526",
      color: "#fff",
      padding: "1.2rem 0 0.7rem 0",
      margin: "0 auto",
      boxShadow: "0 -2px 24px rgba(44,62,80,0.13)",
      borderTop: "2px solid #00fff7",
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
      position: "relative",
      zIndex: 1,
      textAlign: "center",
      marginTop: "auto",
    }}
  >
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "0 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.7rem",
      }}
      className="footer-content"
    >
      <div style={{ width: "100%" }}>
        <h2 style={{
          margin: 0,
          fontWeight: 700,
          fontSize: "1.1rem",
          letterSpacing: "1px",
          color: "#00fff7",
        }}>
          CLOPICK
        </h2>
        <p style={{
          margin: "0.5rem 0 0 0",
          color: "#e0e7ef",
          fontSize: "0.9rem",
          lineHeight: 1.5
        }}>
          Your destination for the latest and trendiest men's fashion.
        </p>
      </div>
      <div style={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", gap: "0.7rem", justifyContent: "center" }}>
          <a href="/" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.9rem",
            transition: "color 0.2s"
          }}>Home</a>
          <a href="/cart" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.9rem",
            transition: "color 0.2s"
          }}>Cart</a>
          <a href="/seller-auth" style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "0.9rem",
            transition: "color 0.2s"
          }}>Sell</a>
        </div>
      </div>
      <div style={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <p style={{
          margin: 0,
          color: "#e0e7ef",
          fontSize: "0.9rem",
          lineHeight: 1.5
        }}>
          support@clopick.com | +91 98765 43210
        </p>
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.7rem", justifyContent: "center" }}>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style={{
              width: 16,
              filter: "invert(1)",
              transition: "transform 0.2s"
            }} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" style={{
              width: 16,
              filter: "invert(1)",
              transition: "transform 0.2s"
            }} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" style={{
              width: 16,
              filter: "invert(1)",
              transition: "transform 0.2s"
            }} />
          </a>
        </div>
      </div>
    </div>
    <div
      style={{
        textAlign: "center",
        color: "#00fff7",
        fontSize: "0.85rem",
        marginTop: "1rem",
        letterSpacing: "0.5px",
        borderTop: "1px solid #374151",
        paddingTop: "0.5rem",
        background: "#232526",
      }}
    >
      &copy; {new Date().getFullYear()} <span style={{ color: "#00fff7", fontWeight: 700 }}>CLOPICK</span>. All rights reserved.
    </div>
  </footer>
);

const Footer = () => {
  const isMobile = window.innerWidth <= 600;
  return isMobile ? <MobileFooter /> : <DesktopFooter />;
};

export default Footer;