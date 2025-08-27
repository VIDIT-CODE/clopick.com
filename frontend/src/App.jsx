import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrendingProducts from "./components/TrendingProducts";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import SellerDashboard from "./components/SellerDashboard";
import ShirtsPage from "./components/ShirtsPage";
import TShirtsPage from "./components/TShirtsPage";
import JeansPage from "./components/JeansPage";
import JacketsPage from "./components/JacketsPage";
import HoodiesPage from "./components/HoodiesPage";
import CargosPage from "./components/CargosPage";
import EthnicWearPage from "./components/EthnicWearPage";
import Footer from "./components/Footer";

function App() {
  return (
    <CartProvider>
      <Router>
        <div
          style={{
            width: "100%",
            maxWidth: "430px",
            margin: "0 auto",
            padding: "0 8px",
            boxSizing: "border-box",
            background: "#fff",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          {/* Add mobile-specific margins between sections */}
          <div className="mobile-section" style={{ width: "100%", marginBottom: "2.2rem" }}>
            <TrendingProducts />
          </div>
          <div className="mobile-section" style={{ width: "100%", marginBottom: "2.2rem" }}>
            <ClothingSlideshow />
          </div>
          <div className="mobile-section" style={{ width: "100%", marginBottom: "2.2rem" }}>
            <CategorySection />
          </div>
          <div className="mobile-section" style={{ width: "100%", marginBottom: "0" }}>
            <Footer />
          </div>
          <Routes>
            <Route path="/" element={<TrendingProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/category/shirts" element={<ShirtsPage />} />
            <Route path="/category/tshirts" element={<TShirtsPage />} />
            <Route path="/category/jeans" element={<JeansPage />} />
            <Route path="/category/jackets" element={<JacketsPage />} />
            <Route path="/category/hoodies" element={<HoodiesPage />} />
            <Route path="/category/cargos" element={<CargosPage />} />
            <Route path="/category/ethnic" element={<EthnicWearPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;