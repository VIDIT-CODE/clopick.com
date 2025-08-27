import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingProducts.css";
import { CartContext } from "../context/CartContext";

const TrendingProducts = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [addedProductId, setAddedProductId] = useState(null);

  const products = [
    {
      id: 1,
      title: "Regular Fit Polo T-Shirt",
      price: 714,
      image: "https://m.media-amazon.com/images/I/71eUwDk8z+L._AC_UL480_.jpg",
      rating: 4.5,
      reviews: 120,
      bestseller: true,
    },
    {
      id: 2,
      title: "Dotted Oversized Tshirt",
      price: 279,
      image: "https://m.media-amazon.com/images/I/71U69KZLpvL._AC_UL480_.jpg",
      rating: 4.2,
      reviews: 85,
      bestseller: false,
    },
    {
      id: 3,
      title: "Mens Sports T-Shirts",
      price: 297,
      image: "https://m.media-amazon.com/images/I/616bDUoOBjL._AC_UL480_.jpg",
      rating: 4.7,
      reviews: 210,
      bestseller: true,
    },
    {
      id: 4,
      title: "Leriya Textured Shirts",
      price: 499,
      image: "https://m.media-amazon.com/images/I/61hmjIQ3tqL._AC_UL480_.jpg",
      rating: 4.3,
      reviews: 60,
      bestseller: false,
    },
    {
      id: 5,
      title: "Stylish Hoodie",
      price: 899,
      image: "https://m.media-amazon.com/images/I/618LnLuG2HL._AC_UL480_.jpg",
      rating: 4.6,
      reviews: 130,
      bestseller: true,
    },
    {
      id: 6,
      title: "Mens Cargo Pants",
      price: 649,
      image: "https://m.media-amazon.com/images/I/51NSC2qvOxL._AC_UL480_.jpg",
      rating: 4.4,
      reviews: 80,
      bestseller: false,
    },
    {
      id: 7,
      title: "Smart Casual Shirt",
      price: 699,
      image: "https://m.media-amazon.com/images/I/61R1R+tsmLL._AC_UL480_.jpg",
      rating: 4.8,
      reviews: 170,
      bestseller: true,
    },
    {
      id: 8,
      title: "Trendy Jeans",
      price: 779,
      image: "https://m.media-amazon.com/images/I/815gdBdQIOL._AC_UL480_.jpg",
      rating: 4.2,
      reviews: 60,
      bestseller: false,
    },
  ];

  return (
    <div
      className="homepage-section trending-container trending-products-section"
      style={{
        width: "100%",
        maxWidth: "1200px", // set a fixed desktop max width
        margin: "2rem auto",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
        order: 3,
        overflow: "hidden", // prevent overflow/overlapping
      }}
    >
      <h2>Trending Products</h2>
      <div
        className="trending-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 cards per row, 2 rows for 8 cards
          gap: "1.5rem",
          justifyItems: "center",
          marginTop: "2rem",
          position: "relative",
          zIndex: 2,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 4px 24px 0 rgba(44,62,80,0.07), 0 1.5px 8px #e0e7ef",
              padding: "1.3rem 1.1rem 1.1rem 1.1rem",
              minWidth: 0,
              maxWidth: "100%",
              width: "100%",
              textAlign: "center",
              position: "relative",
              transition: "transform 0.15s, box-shadow 0.15s",
              border: "1.5px solid #e3e8ee",
              cursor: "pointer",
              outline: "none",
              marginBottom: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px 0 rgba(44,62,80,0.13), 0 2px 12px #e0e7ef";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "0 4px 24px 0 rgba(44,62,80,0.07), 0 1.5px 8px #e0e7ef";
            }}
          >
            {/* Remove Link wrapping, make card itself clickable */}
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                maxWidth: 110,
                height: 110,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 8,
                pointerEvents: "none"
              }}
            />
            <div
              style={{
                fontWeight: 700,
                fontSize: 17,
                color: "#232526",
                marginBottom: 4,
                minHeight: 48,
              }}
            >
              {product.title}
            </div>
            <div
              style={{
                color: "#1976d2",
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 2,
              }}
            >
              ₹{product.price}
            </div>
            <div
              style={{
                color: "#fbc02d",
                fontWeight: 600,
                fontSize: 15,
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
                <span key={i}>★</span>
              ))}
              <span
                style={{
                  color: "#888",
                  fontWeight: 500,
                  fontSize: 14,
                  marginLeft: 4,
                }}
              >
                ({product.reviews || 0})
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "1rem 0 0.5rem 0" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  setAddedProductId(product.id);
                  setTimeout(() => setAddedProductId(null), 1200);
                }}
                style={{
                  background: addedProductId === product.id ? "#b6e2c2" : "#e0e0e0",
                  color: "#232526",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.5rem 1.1rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 1.5px 8px #e0e7ef",
                  transition: "background 0.18s",
                }}
                disabled={addedProductId === product.id}
              >
                {addedProductId === product.id ? "Added to cart" : "Add to Cart"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${product.id}`, { state: { product } });
                }}
                style={{
                  background: "#232526",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.5rem 1.1rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 1.5px 8px #e0e7ef",
                  textDecoration: "none",
                  transition: "background 0.18s",
                }}
              >
                Buy Now
              </button>
            </div>
            {product.bestseller && (
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "#f9a825",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  borderRadius: 6,
                  padding: "2px 10px",
                  boxShadow: "0 1.5px 8px #e0e7ef",
                }}
              >
                Bestseller
              </span>
            )}
          </div>
        ))}
      </div>
      <style>
        {`
        .homepage-section {
          width: 100%;
          max-width: 1200px;
          margin: 2rem auto;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .trending-products-section {
          order: 3;
        }
        .trending-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1rem 2rem;
          box-sizing: border-box;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        .trending-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          position: relative;
          z-index: 2;
          width: 100%;
          overflow: hidden;
        }
        @media (max-width: 600px) {
          .trending-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default TrendingProducts;