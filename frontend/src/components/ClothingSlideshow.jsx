import React, { useState, useEffect } from "react";
import s1 from "./s1.png";
import s3 from "./s3.png";
import s2 from "./s2.png";
import s4 from "./s4.png";

// Use the same images as in TrendingProducts
const slides = [
  {
    url: s1,
  },
  {
    url: s3,
  },
  {
    url: s2,
  },
  {
    url: s4,
  },
];

const ClothingSlideshow = () => {
  const [current, setCurrent] = useState(0);

  const safeCurrent =
    slides.length > 0 && current < slides.length ? current : 0;

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [current]);

  if (!slides[safeCurrent]) {
    return null;
  }

  // Arrow navigation handlers
  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div
      className="homepage-section clothing-slideshow-section"
      style={{
        width: "100%",
        maxWidth: "96vw",
        height: "480px",
        position: "relative",
        borderRadius: "18px",
        overflow: "hidden",
        margin: "2rem auto 2.5rem auto",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        background: "transparent", // Remove white background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Left Arrow */}
      <button
        aria-label="Previous"
        onClick={goPrev}
        style={{
          position: "absolute",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          background: "rgba(34,34,34,0.7)",
          border: "none",
          borderRadius: "50%",
          width: 44,
          height: 44,
          color: "#fff",
          fontSize: "2rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px #23252644",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        &#8592;
      </button>
      {/* Slideshow image with rounded corners and margin */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "18px",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "transparent", // Remove white background
        }}
      >
        <img
          src={slides[safeCurrent].url}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.5s",
            display: "block",
            borderRadius: "18px",
            boxShadow: "none", // Remove any shadow from image
            border: "none",    // Remove any border from image
          }}
        />
        {/* Dots navigation */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            zIndex: 4,
          }}
        >
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: idx === safeCurrent ? "#fff" : "#bbb",
                opacity: idx === safeCurrent ? 1 : 0.6,
                border: idx === safeCurrent ? "2px solid #232526" : "none",
                cursor: "pointer",
                display: "inline-block",
                transition: "background 0.2s, border 0.2s",
              }}
            />
          ))}
        </div>
      </div>
      {/* Right Arrow */}
      <button
        aria-label="Next"
        onClick={goNext}
        style={{
          position: "absolute",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          background: "rgba(34,34,34,0.7)",
          border: "none",
          borderRadius: "50%",
          width: 44,
          height: 44,
          color: "#fff",
          fontSize: "2rem",
          cursor: "pointer",
          boxShadow: "0 2px 8px #23252644",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        &#8594;
      </button>
      <style>
        {`
        @media (max-width: 900px) {
          .homepage-section.clothing-slideshow-section {
            height: 320px !important;
            border-radius: 10px !important;
            max-width: 98vw !important;
          }
          .homepage-section.clothing-slideshow-section > div {
            border-radius: 10px !important;
            background: transparent !important;
          }
        }
        @media (max-width: 600px) {
          .homepage-section.clothing-slideshow-section {
            height: 180px !important;
            border-radius: 0 !important;
            max-width: 98vw !important;
          }
          .homepage-section.clothing-slideshow-section > div {
            border-radius: 0 !important;
            background: transparent !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default ClothingSlideshow;