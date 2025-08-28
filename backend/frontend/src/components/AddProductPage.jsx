import React from "react";

const fileInputRefs = Array.from({ length: 8 }, () => React.createRef());

const AddProductPage = () => {
  const [images, setImages] = React.useState(Array(8).fill(null));
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [addProductMessage, setAddProductMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Get seller info from localStorage (same as SellerDashboard)
  const seller = React.useMemo(() => {
    try {
      const stored = localStorage.getItem("clopick_seller");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const handleImageRemove = (idx) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[idx] = null;
      return updated;
    });
  };

  const handleImageUploadClick = (idx) => {
    if (fileInputRefs[idx].current) {
      fileInputRefs[idx].current.click();
    }
  };

  // Helper to convert image file to base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Upload product to backend (including images as base64)
  const uploadProductToBackend = async (product) => {
    try {
      const res = await fetch("/api/seller/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });
      if (!res.ok) {
        // Read response body only once
        const responseText = await res.text();
        let errMsg = "Something went wrong!";
        try {
          const errData = JSON.parse(responseText);
          errMsg = errData.message || errData.error || errMsg;
        } catch {
          errMsg = responseText.startsWith('<!DOCTYPE') ? "Server error: received HTML instead of JSON. Check your backend route and URL." : responseText;
        }
        throw new Error(errMsg);
      }
    } catch (err) {
      setError(err.message || "Failed to add product");
    }
  };

  // Use react-router to navigate to My Products after adding a product
  // (Assuming you are using react-router-dom v6)
  // If not using react-router, you can still use window.location.reload() as fallback
  // But this is the recommended way:
  // import { useNavigate } from "react-router-dom";
  // const navigate = useNavigate();
  // and then call: navigate("/seller-dashboard", { state: { section: "myProducts" } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!seller?._id) {
      setError("Seller not found. Please log in again.");
      return;
    }
    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.stock ||
      images.every((img) => !img)
    ) {
      setError("Please fill all fields and upload at least one product image.");
      return;
    }
    // Convert images to base64 and filter out nulls
    const base64Images = await Promise.all(
      images.filter(Boolean).map((img) => getBase64(img))
    );
    const product = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      images: base64Images, // only non-null images sent
      createdAt: new Date().toISOString(),
      sellerId: seller._id,
      sellerEmail: seller?.email?.toLowerCase() || "",
    };

    await uploadProductToBackend(product);

    setIsSubmitting(true);
    setAddProductMessage("Product added successfully! It is now live in Trending Products.");
    setTimeout(() => {
      setAddProductMessage("");
      setIsSubmitting(false);
      window.dispatchEvent(new Event("seller-product-added"));
    }, 2000);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    });
    setImages(Array(8).fill(null));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "calc(100vh - 64px - 2.4rem)",
        background: "#f4f6fb",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
        padding: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          background: "#fff",
          borderRadius: 0,
          boxShadow: "0 8px 32px rgba(44,62,80,0.10), 0 1.5px 8px #23252611",
          padding: "3.5rem 4vw 3.5rem 4vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          position: "relative",
          overflow: "hidden",
          minHeight: "100%",
        }}
      >
        <h2
          style={{
            fontWeight: 900,
            fontSize: "2.2rem",
            marginBottom: 8,
            letterSpacing: 1,
            color: "#232526",
            textAlign: "left",
          }}
        >
          Add a New Product
        </h2>
        <div
          style={{
            color: "#555",
            fontSize: "1.13rem",
            marginBottom: "2.2rem",
            textAlign: "left",
          }}
        >
          Enter all the details below to list your product on CLOPICK. Make your
          listing stand out with a great description and images.
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.2rem",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <div style={{ display: "flex", gap: "2.5rem" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              <label
                style={{
                  fontWeight: 700,
                  color: "#232526",
                  fontSize: "1.08rem",
                  marginBottom: 6,
                  letterSpacing: 0.2,
                  marginLeft: 0, // changed from 2 to 0
                  textAlign: "left", // ensure left alignment
                  alignSelf: "flex-start", // ensure left alignment
                }}
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Classic Denim Jacket"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: 10,
                  border: "1.5px solid #e0e7ef",
                  fontSize: "1.08rem",
                  background: "#f8fafc",
                  marginBottom: 0,
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              <label
                style={{
                  fontWeight: 700,
                  color: "#232526",
                  fontSize: "1.08rem",
                  marginBottom: 6,
                  letterSpacing: 0.2,
                  marginLeft: 0,
                  textAlign: "left",
                  alignSelf: "flex-start",
                }}
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="e.g. Jackets"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: 10,
                  border: "1.5px solid #e0e7ef",
                  fontSize: "1.08rem",
                  background: "#f8fafc",
                  marginBottom: 0,
                }}
              />
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <label
              style={{
                fontWeight: 700,
                color: "#232526",
                fontSize: "1.08rem",
                marginBottom: 6,
                letterSpacing: 0.2,
                marginLeft: 0,
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe your product, its features, and why customers will love it."
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: 10,
                border: "1.5px solid #e0e7ef",
                fontSize: "1.08rem",
                background: "#f8fafc",
                resize: "vertical",
                marginBottom: 0,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              <label
                style={{
                  fontWeight: 700,
                  color: "#232526",
                  fontSize: "1.08rem",
                  marginBottom: 6,
                  letterSpacing: 0.2,
                  marginLeft: 0,
                  textAlign: "left",
                  alignSelf: "flex-start",
                }}
              >
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min={0}
                placeholder="e.g. 1999"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: 10,
                  border: "1.5px solid #e0e7ef",
                  fontSize: "1.08rem",
                  background: "#f8fafc",
                  marginBottom: 0,
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1.1rem",
              }}
            >
              <label
                style={{
                  fontWeight: 700,
                  color: "#232526",
                  fontSize: "1.08rem",
                  marginBottom: 6,
                  letterSpacing: 0.2,
                  marginLeft: 0,
                  textAlign: "left",
                  alignSelf: "flex-start",
                }}
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min={0}
                placeholder="e.g. 50"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: 10,
                  border: "1.5px solid #e0e7ef",
                  fontSize: "1.08rem",
                  background: "#f8fafc",
                  marginBottom: 0,
                }}
              />
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <label
              style={{
                fontWeight: 700,
                color: "#232526",
                fontSize: "1.08rem",
                marginBottom: 6,
                letterSpacing: 0.2,
                marginLeft: 0,
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              Product Images (up to 8)
            </label>
            <div
              style={{
                display: "flex",
                gap: "1.2rem",
                flexWrap: "wrap",
                marginTop: 2,
              }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 12,
                    border: img ? "2px solid #1976d2" : "2px dashed #b0b8c9",
                    background: "#f8fafc",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {img ? (
                    <>
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Product ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(idx)}
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          background: "#fff",
                          color: "#d32f2f",
                          border: "none",
                          borderRadius: "50%",
                          width: 22,
                          height: 22,
                          fontWeight: 900,
                          fontSize: 16,
                          cursor: "pointer",
                          boxShadow: "0 1px 4px #23252622",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        title="Remove"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => handleImageUploadClick(idx)}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                        title="Add Image"
                      >
                        <span
                          style={{
                            fontSize: 38,
                            color: "#b0b8c9",
                            fontWeight: 700,
                            userSelect: "none",
                          }}
                        >
                          +
                        </span>
                        <input
                          ref={fileInputRefs[idx]}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => handleImageChange(e, idx)}
                        />
                      </div>
                    </>
                  )}
                  {/* Main image label */}
                  {idx === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -28,
                        textAlign: "center",
                        fontSize: "0.98rem",
                        color: "#1976d2",
                        fontWeight: 600,
                        letterSpacing: 0.2,
                        background: "none",
                      }}
                    >
                      Main Image
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                fontSize: "0.98rem",
                color: "#888",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              The first image will be used as the main image for your product.
            </div>
          </div>
          {/* Error message */}
          {error && (
            <div
              style={{
                color: "#d32f2f",
                fontWeight: 600,
                fontSize: "1.08rem",
                marginBottom: "0.5rem",
                textAlign: "center",
                background: "#ffebee",
                borderRadius: 8,
                padding: "0.7rem",
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              background: isSubmitting
                ? "#388e3c"
                : isHovered
                ? "#388e3c"
                : "#232526",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "1.1rem 0",
              fontWeight: 800,
              fontSize: "1.18rem",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              marginTop: "0.5rem",
              boxShadow: "0 2px 8px #23252622",
              letterSpacing: 1,
              transition: "background 0.2s",
              opacity: isSubmitting ? 0.8 : 1,
            }}
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isSubmitting ? "Product Added" : "Add Product"}
          </button>
          {addProductMessage && (
            <div
              style={{
                color: "#388e3c",
                fontWeight: 700,
                fontSize: "1.1rem",
                marginTop: "0.7rem",
                textAlign: "center",
                background: "#e8f5e9",
                borderRadius: 8,
                padding: "0.7rem",
              }}
            >
              {addProductMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
