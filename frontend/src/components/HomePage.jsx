import React from "react";
import TrendingProducts from "./TrendingProducts";
import ClothingSlideshow from "./ClothingSlideshow";

const HomePage = () => {
  return (
    <div>
      {/* Trending products cards */}
      <div className="trending-products-mobile-separator">
        <TrendingProducts />
      </div>
      {/* Clothing slideshow below trending products */}
      <ClothingSlideshow />
      {/* ...other homepage sections... */}
      <style>
        {`
        @media (max-width: 900px) {
          .trending-products-mobile-separator {
            margin-bottom: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .trending-products-mobile-separator {
            margin-bottom: 2.5rem !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default HomePage;