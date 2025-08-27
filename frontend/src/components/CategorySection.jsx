// src/components/CategorySection.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CategorySection.css";

// Example categories with relevant images
const categories = [
  {
    name: "Shirts",
    image: "https://m.media-amazon.com/images/I/61hmjIQ3tqL._AC_UL480_.jpg",
    link: "/category/shirts",
  },
  {
    name: "T-Shirts",
    image: "https://m.media-amazon.com/images/I/616bDUoOBjL._AC_UL480_.jpg",
    link: "/category/tshirts",
  },
  {
    name: "Jeans",
    image: "https://m.media-amazon.com/images/I/815gdBdQIOL._AC_UL480_.jpg",
    link: "/category/jeans",
  },
  {
    name: "Hoodies",
    image: "https://m.media-amazon.com/images/I/618LnLuG2HL._AC_UL480_.jpg",
    link: "/category/hoodies",
  },
  {
    name: "Cargos",
    image: "https://m.media-amazon.com/images/I/51NSC2qvOxL._AC_UL480_.jpg",
    link: "/category/cargos",
  },
];

const CategorySection = () => (
  <div
    className="homepage-section category-section-mobile"
    style={{
      width: "100%",
      maxWidth: "96vw",
      minHeight: 320,
      position: "relative",
      borderRadius: "18px",
      overflow: "visible",
      margin: "2rem auto 2.5rem auto",
      boxShadow: "none",
      background: "transparent",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      border: "none",
    }}
  >
    <div
      style={{
        position: "relative",
        zIndex: 2,
        padding: "2rem 3rem 1rem 3rem",
        width: "100%",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
      }}
    >
      <h2
        style={{
          color: "#232526",
          fontSize: "2.3rem",
          fontWeight: 900,
          margin: 0,
          letterSpacing: "2px",
          textShadow: "0 2px 16px #e0e7ef, 0 2px 8px #fff",
          textAlign: "center",
          marginBottom: "1.2rem",
        }}
      >
        Shop by Category
      </h2>
      <div
        style={{
          display: "flex",
          gap: "2.5rem",
          marginTop: "1.5rem",
          overflowX: "auto",
          overflowY: "hidden",
          height: "220px",
          position: "relative",
          zIndex: 2,
          justifyContent: "flex-start",
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
          paddingBottom: "0.5rem",
          cursor: "grab",
          msOverflowStyle: "auto",
          overscrollBehaviorX: "contain",
          minWidth: "100%",
        }}
        tabIndex={0}
        ref={el => {
          // Ensure scroll works on mobile by forcing min-width
          if (el) {
            el.style.minWidth = el.scrollWidth > el.clientWidth ? `${el.scrollWidth}px` : "100%";
          }
        }}
        onWheel={e => {
          // Enable horizontal scroll with mouse wheel (for desktop)
          if (e.deltaY !== 0 && e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
            e.currentTarget.scrollLeft += e.deltaY;
            e.preventDefault();
          }
        }}
        onTouchStart={e => {
          e.currentTarget._touchStartX = e.touches[0].clientX;
          e.currentTarget._touchScrollLeft = e.currentTarget.scrollLeft;
        }}
        onTouchMove={e => {
          if (e.currentTarget._touchStartX !== undefined) {
            const dx = e.currentTarget._touchStartX - e.touches[0].clientX;
            e.currentTarget.scrollLeft = e.currentTarget._touchScrollLeft + dx;
            e.preventDefault();
          }
        }}
        onTouchEnd={e => {
          e.currentTarget._touchStartX = undefined;
          e.currentTarget._touchScrollLeft = undefined;
        }}
      >
        {categories.map((cat, idx) => (
          <Link
            to={cat.link}
            key={cat.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 170,
              maxWidth: 200,
              textDecoration: "none",
              color: "#232526",
              background: "rgba(255,255,255,0.85)",
              borderRadius: "18px",
              boxShadow: "0 6px 32px rgba(0,0,0,0.08), 0 1.5px 8px #e0e7ef",
              padding: "1.5rem 1.2rem 1.2rem 1.2rem",
              transition: "box-shadow 0.18s, transform 0.18s",
              border: "none",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseOver={e => {
              e.currentTarget.style.boxShadow = "0 12px 36px 0 #e0e7ef, 0 2px 12px #fff";
              e.currentTarget.style.transform = "translateY(-6px) scale(1.06)";
              e.currentTarget.style.background = "rgba(245,245,245,0.95)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.boxShadow = "0 6px 32px rgba(0,0,0,0.08), 0 1.5px 8px #e0e7ef";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.background = "rgba(255,255,255,0.85)";
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "12px",
                marginBottom: 16,
                background: "#f6f7fb",
                boxShadow: "0 1.5px 8px #e0e7ef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                border: "none",
                position: "relative",
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "none",
                  transition: "transform 0.18s",
                }}
              />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 18,
                textAlign: "center",
                color: "#232526",
                letterSpacing: "1px",
                marginTop: 6,
                textShadow: "0 2px 8px #e0e7ef",
              }}
            >
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
    <style>
      {`
      @media (max-width: 900px) {
        .category-section-mobile > div > div {
          gap: 1.2rem !important;
          height: 180px !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          padding-bottom: 0.5rem !important;
          cursor: grab !important;
          ms-overflow-style: auto !important;
          overscroll-behavior-x: contain !important;
          -webkit-overflow-scrolling: touch !important;
          min-width: min-content !important;
        }
      }
      @media (max-width: 600px) {
        .category-section-mobile > div > div {
          gap: 0.7rem !important;
          height: 120px !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          padding-bottom: 0.5rem !important;
          cursor: grab !important;
          ms-overflow-style: auto !important;
          overscroll-behavior-x: contain !important;
          -webkit-overflow-scrolling: touch !important;
          min-width: min-content !important;
        }
      }
      .category-section-mobile > div > div::-webkit-scrollbar {
        height: 8px;
      }
      .category-section-mobile > div > div::-webkit-scrollbar-thumb {
        background: #e0e7ef;
        border-radius: 4px;
      }
      `}
    </style>
  </div>
);

export default CategorySection;