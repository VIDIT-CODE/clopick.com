import React, { useEffect, useState } from "react";

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [carouselIdx, setCarouselIdx] = useState({});
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [editImages, setEditImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [imageInputRef, setImageInputRef] = useState(null);
  const [newImageUploading, setNewImageUploading] = useState(false);
  const seller = React.useMemo(() => {
    try {
      const stored = localStorage.getItem("clopick_seller");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/seller/products?sellerEmail=${encodeURIComponent(seller?.email || "")}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      }
      setLoading(false);
    };
    if (seller?.email) fetchProducts();
  }, [seller]);

  // Carousel controls for each product
  const handlePrev = (id, images) => {
    setCarouselIdx((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : images.length - 1
    }));
  };
  const handleNext = (id, images) => {
    setCarouselIdx((prev) => ({
      ...prev,
      [id]: prev[id] < images.length - 1 ? prev[id] + 1 : 0
    }));
  };

  const handleEditClick = (product) => {
    setEditId(product._id);
    setEditFields({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock
    });
    setEditImages(product.images ? [...product.images] : []);
    setImageUploadError("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value
    }));
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditFields({});
    setEditImages([]);
    setImageUploadError("");
  };

  const handleRemoveImage = (idx) => {
    setEditImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddImageFile = async (e) => {
    setImageUploadError("");
    setNewImageUploading(true);
    const file = e.target.files[0];
    if (!file) {
      setNewImageUploading(false);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setImageUploadError("Only image files are allowed.");
      setNewImageUploading(false);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageUploadError("Image size should be less than 2MB.");
      setNewImageUploading(false);
      return;
    }
    // Convert to base64 for preview (replace with upload logic if needed)
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImages((prev) => [...prev, reader.result]);
      setNewImageUploading(false);
    };
    reader.onerror = () => {
      setImageUploadError("Failed to read image.");
      setNewImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleEditSave = async (productId) => {
    setSaving(true);
    try {
      // Validate productId format before making the request
      if (!productId || !/^[0-9a-fA-F]{24}$/.test(productId)) {
        throw new Error("Invalid product ID.");
      }
      // Double-check product exists in local state before making request
      const exists = products.some(p => p._id === productId);
      if (!exists) {
        throw new Error("Product not found in your product list.");
      }
      // Ensure images is always an array of strings (no objects)
      const cleanImages = editImages
        .map(img => (typeof img === "string" ? img : (img && img.dataURL ? img.dataURL : "")))
        .filter(img => typeof img === "string" && img.trim().length > 0);

      const payload = { ...editFields, images: cleanImages };
      const res = await fetch(`/api/seller/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.status === 404) {
        throw new Error("Product not found on server. It may have been deleted or the ID is incorrect.");
      }
      if (!res.ok) throw new Error("Failed to update product");
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, ...updated } : p))
      );
      setEditId(null);
      setEditFields({});
      setEditImages([]);
      setImageUploadError("");
    } catch (err) {
      alert(err.message || "Failed to update product");
    }
    setSaving(false);
  };

  return (
    <div style={{
      background: "#f3f3f3",
      minHeight: "100vh",
      padding: "2rem 0"
    }}>
      <div style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "0 2vw"
      }}>
        <h2 style={{
          fontWeight: 900,
          fontSize: "2.3rem",
          marginBottom: 8,
          letterSpacing: 1,
          color: "#232526",
          textAlign: "left"
        }}>
          My Products
        </h2>
        <div style={{
          color: "#555",
          fontSize: "1.13rem",
          marginBottom: "2.2rem",
          textAlign: "left"
        }}>
          Manage your products listed on CLOPICK. Click "View" for more details.
        </div>
        {loading ? (
          <div style={{ textAlign: "center", margin: "2rem 0", fontSize: "1.2rem" }}>Loading...</div>
        ) : error ? (
          <div style={{
            color: "#d32f2f",
            fontWeight: 600,
            fontSize: "1.08rem",
            marginBottom: "0.5rem",
            textAlign: "center",
            background: "#ffebee",
            borderRadius: 8,
            padding: "0.7rem"
          }}>{error}</div>
        ) : products.length === 0 ? (
          <div style={{
            textAlign: "center",
            color: "#888",
            fontSize: "1.1rem",
            margin: "2rem 0"
          }}>
            No products found. Start adding your products!
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "2.2rem"
          }}>
            {products.map((product, idx) => {
              const images = product.images && product.images.length > 0 ? product.images : ["/no-image.png"];
              const currentIdx = carouselIdx[product._id || idx] || 0;
              return (
                <div
                  key={product._id || idx}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    boxShadow: "0 4px 24px 0 #23252618, 0 1.5px 8px #23252608",
                    padding: "1.5rem 1.2rem 1.2rem 1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    cursor: "pointer",
                    border: "1.5px solid #e3e6e8",
                    position: "relative",
                    minHeight: 470,
                    overflow: "hidden",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                  tabIndex={0}
                >
                  <div style={{
                    width: "100%",
                    height: 210,
                    background: "#f8fafc",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                    overflow: "hidden",
                    border: "1.5px solid #e0e7ef",
                    position: "relative"
                  }}>
                    <img
                      src={images[currentIdx]}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        background: "#fff",
                        transition: "opacity 0.2s"
                      }}
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={e => { e.stopPropagation(); handlePrev(product._id || idx, images); }}
                          style={{
                            position: "absolute",
                            left: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            boxShadow: "0 1px 4px #23252622",
                            fontWeight: 900,
                            fontSize: 18,
                            color: "#232526",
                            cursor: "pointer",
                            opacity: 0.85
                          }}
                          title="Previous image"
                        >‹</button>
                        <button
                          onClick={e => { e.stopPropagation(); handleNext(product._id || idx, images); }}
                          style={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: 32,
                            height: 32,
                            boxShadow: "0 1px 4px #23252622",
                            fontWeight: 900,
                            fontSize: 18,
                            color: "#232526",
                            cursor: "pointer",
                            opacity: 0.85
                          }}
                          title="Next image"
                        >›</button>
                        <div style={{
                          position: "absolute",
                          bottom: 8,
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#fff",
                          borderRadius: 12,
                          padding: "2px 12px",
                          fontSize: "0.93rem",
                          color: "#1976d2",
                          fontWeight: 600,
                          boxShadow: "0 1px 4px #23252611"
                        }}>
                          {currentIdx + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{
                    fontWeight: 800,
                    fontSize: "1.18rem",
                    color: "#232526",
                    marginBottom: 6,
                    minHeight: 32,
                    letterSpacing: 0.2
                  }}>
                    {product.name}
                  </div>
                  <div style={{
                    color: "#1976d2",
                    fontWeight: 700,
                    fontSize: "1.04rem",
                    marginBottom: 4
                  }}>
                    {product.category}
                  </div>
                  <div style={{
                    color: "#555",
                    fontSize: "1.01rem",
                    marginBottom: 12,
                    minHeight: 44,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}>
                    {product.description}
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto"
                  }}>
                    <div style={{
                      color: "#b12704",
                      fontWeight: 900,
                      fontSize: "1.32rem"
                    }}>
                      ₹{product.price}
                    </div>
                    <div style={{
                      color: product.stock > 0 ? "#388e3c" : "#d32f2f",
                      fontWeight: 700,
                      fontSize: "1.04rem",
                      background: product.stock > 0 ? "#e8f5e9" : "#ffebee",
                      borderRadius: 6,
                      padding: "2px 10px"
                    }}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                  {editId === product._id ? (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleEditSave(product._id);
                      }}
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        background: "#f8fafc",
                        borderRadius: 12,
                        boxShadow: "0 2px 12px #23252611",
                        padding: "1.5rem 1.2rem",
                        border: "1.5px solid #e3e6e8"
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        <div>
                          <label style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 6, display: "block", color: "#232526" }}>Product Name</label>
                          <input
                            name="name"
                            value={editFields.name}
                            onChange={handleEditChange}
                            placeholder="Name"
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              borderRadius: 8,
                              border: "1.5px solid #cfd8dc",
                              fontSize: "1.08rem",
                              marginBottom: 0,
                              background: "#fff"
                            }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 6, display: "block", color: "#232526" }}>Category</label>
                          <input
                            name="category"
                            value={editFields.category}
                            onChange={handleEditChange}
                            placeholder="Category"
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              borderRadius: 8,
                              border: "1.5px solid #cfd8dc",
                              fontSize: "1.08rem",
                              marginBottom: 0,
                              background: "#fff"
                            }}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 6, display: "block", color: "#232526" }}>Description</label>
                          <textarea
                            name="description"
                            value={editFields.description}
                            onChange={handleEditChange}
                            placeholder="Description"
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              borderRadius: 8,
                              border: "1.5px solid #cfd8dc",
                              fontSize: "1.08rem",
                              minHeight: 70,
                              background: "#fff"
                            }}
                            required
                          />
                        </div>
                        <div style={{ display: "flex", gap: 16 }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 6, display: "block", color: "#232526" }}>Price</label>
                            <input
                              name="price"
                              type="number"
                              value={editFields.price}
                              onChange={handleEditChange}
                              placeholder="Price"
                              style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 8,
                                border: "1.5px solid #cfd8dc",
                                fontSize: "1.08rem",
                                background: "#fff"
                              }}
                              required
                              min={0}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 6, display: "block", color: "#232526" }}>Stock</label>
                            <input
                              name="stock"
                              type="number"
                              value={editFields.stock}
                              onChange={handleEditChange}
                              placeholder="Stock"
                              style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: 8,
                                border: "1.5px solid #cfd8dc",
                                fontSize: "1.08rem",
                                background: "#fff"
                              }}
                              required
                              min={0}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 6, display: "block", color: "#232526" }}>Images (up to 8)</label>
                          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
                            {[...Array(8)].map((_, idx) => {
                              const img = editImages[idx];
                              return img ? (
                                <div key={idx} style={{
                                  width: 72, height: 72, borderRadius: 10, background: "#fff",
                                  border: "1.5px solid #cfd8dc", position: "relative", display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                  <img
                                    src={img}
                                    alt={`product-img-${idx}`}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: 10
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(idx)}
                                    style={{
                                      position: "absolute",
                                      top: -8,
                                      right: -8,
                                      background: "#d32f2f",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: "50%",
                                      width: 22,
                                      height: 22,
                                      fontSize: 15,
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      boxShadow: "0 1px 4px #23252622"
                                    }}
                                    title="Remove image"
                                    disabled={saving}
                                  >×</button>
                                </div>
                              ) : (
                                <div
                                  key={idx}
                                  style={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: 10,
                                    background: "#f3f3f3",
                                    border: "2px dashed #b0bec5",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: newImageUploading ? "not-allowed" : "pointer",
                                    position: "relative"
                                  }}
                                  onClick={() => {
                                    if (!newImageUploading && imageInputRef) imageInputRef.click();
                                  }}
                                  title="Add image"
                                >
                                  {/* Only show file input for the first empty box */}
                                  {editImages.length === idx && (
                                    <input
                                      type="file"
                                      accept="image/*"
                                      style={{ display: "none" }}
                                      ref={ref => setImageInputRef(ref)}
                                      onChange={handleAddImageFile}
                                      disabled={newImageUploading}
                                    />
                                  )}
                                  {newImageUploading && editImages.length === idx ? (
                                    <span style={{ color: "#1976d2", fontWeight: 700, fontSize: 22 }}>...</span>
                                  ) : (
                                    <span style={{
                                      fontSize: 36,
                                      color: "#90caf9",
                                      fontWeight: 900,
                                      userSelect: "none"
                                    }}>+</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          {imageUploadError && (
                            <div style={{ color: "#d32f2f", fontWeight: 600, marginBottom: 8 }}>{imageUploadError}</div>
                          )}
                        </div>
                        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                          <button
                            type="submit"
                            disabled={saving}
                            style={{
                              background: "#1976d2",
                              color: "#fff",
                              border: "none",
                              borderRadius: 8,
                              padding: "0.8rem 2.2rem",
                              fontWeight: 800,
                              fontSize: "1.08rem",
                              cursor: saving ? "not-allowed" : "pointer",
                              opacity: saving ? 0.7 : 1,
                              letterSpacing: 0.5,
                              boxShadow: "0 2px 8px #23252611"
                            }}
                          >
                            {saving ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={handleEditCancel}
                            disabled={saving}
                            style={{
                              background: "#e0e0e0",
                              color: "#232526",
                              border: "none",
                              borderRadius: 8,
                              padding: "0.8rem 2.2rem",
                              fontWeight: 800,
                              fontSize: "1.08rem",
                              cursor: saving ? "not-allowed" : "pointer",
                              letterSpacing: 0.5
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <>
                      <button
                        style={{
                          marginTop: 10,
                          background: "#1976d2",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "0.6rem 0",
                          fontWeight: 700,
                          fontSize: "1.01rem",
                          cursor: "pointer",
                          width: "100%"
                        }}
                        onClick={e => { e.stopPropagation(); handleEditClick(product); }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          marginTop: 8,
                          background: "#ffd814",
                          color: "#232526",
                          border: "none",
                          borderRadius: 8,
                          padding: "0.7rem 0",
                          fontWeight: 800,
                          fontSize: "1.08rem",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px #23252611",
                          letterSpacing: 0.5,
                          transition: "background 0.2s",
                          width: "100%"
                        }}
                        onClick={e => { e.stopPropagation(); alert("Product details coming soon!"); }}
                      >
                        View
                      </button>
                    </>
                  )}
                  <div style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "#f0c14b",
                    color: "#111",
                    fontWeight: 700,
                    fontSize: "0.93rem",
                    borderRadius: 6,
                    padding: "2px 10px",
                    boxShadow: "0 1px 4px #23252611"
                  }}>
                    LIVE
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProductsPage;
