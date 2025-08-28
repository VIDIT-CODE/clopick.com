import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";

const mockDetails = {
	1: {
		rating: 4.3,
		reviews: 124,
		lastMonthSales: 320,
		offers: ["10% Instant Discount on Credit Cards", "Free Delivery"],
		discount: "15% off",
		details: "Premium cotton polo t-shirt with regular fit and soft feel.",
	},
	2: {
		rating: 4.1,
		reviews: 98,
		lastMonthSales: 210,
		offers: ["5% Cashback on select cards", "No Cost EMI"],
		discount: "20% off",
		details: "Trendy oversized t-shirt with dotted pattern for casual style.",
	},
	3: {
		rating: 4.5,
		reviews: 201,
		lastMonthSales: 410,
		offers: ["Flat ₹50 off on first order", "Free Delivery"],
		discount: "10% off",
		details: "Breathable sports t-shirt for men, perfect for workouts.",
	},
	4: {
		rating: 4.0,
		reviews: 77,
		lastMonthSales: 150,
		offers: ["Extra 5% off on 2+ items", "Free Returns"],
		discount: "12% off",
		details: "Textured shirt with modern fit, suitable for all occasions.",
	},
	5: {
		rating: 4.6,
		reviews: 180,
		lastMonthSales: 350,
		offers: ["10% off on prepaid orders", "Free Delivery"],
		discount: "18% off",
		details: "Stylish hoodie with fleece lining for extra comfort.",
	},
	6: {
		rating: 4.2,
		reviews: 110,
		lastMonthSales: 200,
		offers: ["Flat ₹100 off", "No Cost EMI"],
		discount: "14% off",
		details: "Durable cargo pants with multiple pockets and relaxed fit.",
	},
	7: {
		rating: 4.4,
		reviews: 134,
		lastMonthSales: 270,
		offers: ["Buy 1 Get 1 Free", "Free Delivery"],
		discount: "25% off",
		details: "Smart casual shirt for office and outings.",
	},
	8: {
		rating: 4.3,
		reviews: 156,
		lastMonthSales: 300,
		offers: ["10% Cashback", "Free Delivery"],
		discount: "17% off",
		details: "Trendy jeans with stretchable fabric and modern fit.",
	},
};

const ProductDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { id } = useParams();
	const product = location.state?.product;
	const details = mockDetails[id];

	// Add this function to save order to localStorage
	const handlePlaceOrder = () => {
		if (!product) return;
		const order = {
			id: Date.now(),
			product,
			date: new Date().toISOString(),
			status: "Placed",
			// You can add address/payment fields here if needed
		};
		const prevOrders = JSON.parse(localStorage.getItem("clopick_orders") || "[]");
		localStorage.setItem("clopick_orders", JSON.stringify([order, ...prevOrders]));
	};

	if (!product || !details) {
		return (
			<div style={{ padding: "2rem", textAlign: "center" }}>
				Product not found.
			</div>
		);
	}

	return (
		<div className="product-detail-amazonlike" style={{ paddingLeft: "0", paddingRight: "0", textAlign: "left" }}>
			<div className="product-detail-amazonlike-main">
				<div className="product-detail-image-block">
					{/* Thumbnails on left for large screens, below for small screens */}
					<div className="product-detail-thumbnails-vertical">
						{[product.image, ...(product.images || [
							product.image,
							product.image,
							product.image,
							product.image,
							product.image,
							product.image,
						])].slice(0, 6).map((img, idx) => (
							<img
								key={idx}
								src={img}
								alt={`thumb-${idx}`}
								className="product-detail-thumb-img"
								onClick={() => {
									const mainImg = document.getElementById("main-product-image");
									if (mainImg) mainImg.src = img;
								}}
							/>
						))}
					</div>
					<div className="product-detail-amazonlike-image">
						<img id="main-product-image" src={product.image} alt={product.title} />
						{/* Thumbnails below main image for small screens only */}
						<div className="product-detail-thumbnails-horizontal">
							{[product.image, ...(product.images || [
								product.image,
								product.image,
								product.image,
								product.image,
								product.image,
								product.image,
							])].slice(0, 6).map((img, idx) => (
								<img
									key={idx}
									src={img}
									alt={`thumb-${idx}`}
									className="product-detail-thumb-img"
									onClick={() => {
										const mainImg = document.getElementById("main-product-image");
										if (mainImg) mainImg.src = img;
									}}
								/>
							))}
						</div>
					</div>
				</div>
				<div className="product-detail-amazonlike-info">
					<h1 className="pd-title">{product.title}</h1>
					<div className="pd-rating-row">
						{/* Render 5 stars: each star is either full, partial, or empty */}
						<span className="pd-rating">
							{Array.from({ length: 5 }).map((_, i) => {
								const rating = details.rating;
								const starValue = i + 1;
								if (starValue <= Math.floor(rating)) {
									// Full star
									return (
										<span
											key={i}
											className="pd-star"
											style={{
												color: "#ffd700",
												background: "#fff",
												border: "1.2px solid #232526",
												borderRadius: "3px",
												marginRight: "2px",
												padding: "0 1px",
												fontSize: "1.15rem",
												lineHeight: 1,
												display: "inline-block",
												verticalAlign: "middle",
											}}
										>
											★
										</span>
									);
								} else if (starValue - 1 < rating && rating < starValue) {
									// Partial star (show filled part and empty part)
									const percent = Math.round((rating - (starValue - 1)) * 100);
									return (
										<span
											key={i}
											className="pd-star"
											style={{
												position: "relative",
												display: "inline-block",
												width: "1.15em",
												verticalAlign: "middle",
												background: "#fff",
												border: "1.2px solid #232526",
												borderRadius: "3px",
												marginRight: "2px",
												padding: "0 1px",
												lineHeight: 1,
												overflow: "hidden"
											}}
										>
											<span
												style={{
													position: "absolute",
													left: 0,
													top: 0,
													width: `${percent}%`,
													height: "100%",
													overflow: "hidden",
													color: "#ffd700",
													whiteSpace: "nowrap",
												}}
											>★</span>
											<span
												style={{
													color: "#e0e0e0",
													position: "absolute",
													left: 0,
													top: 0,
													width: "100%",
													height: "100%",
													whiteSpace: "nowrap",
												}}
											>★</span>
										</span>
									);
								} else {
									// Empty star
									return (
										<span
											key={i}
											className="pd-star"
											style={{
												color: "#e0e0e0",
												background: "#fff",
												border: "1.2px solid #232526",
												borderRadius: "3px",
												marginRight: "2px",
												padding: "0 1px",
												fontSize: "1.15rem",
												lineHeight: 1,
												display: "inline-block",
												verticalAlign: "middle",
											}}
										>
											★
										</span>
									);
								}
							})}
							<span style={{ color: "#232526", marginLeft: 8, fontWeight: 700 }}>{details.rating}</span>
						</span>
						<span className="pd-reviews">{details.reviews} ratings</span>
					</div>
					<div className="pd-sales" style={{ color: "#388e3c", fontWeight: 600, margin: "0.3rem 0 1.1rem 0" }}>
						{details.lastMonthSales}+ bought in last month
					</div>
					<div className="pd-price-row">
						<span className="pd-price">₹{product.price}</span>
						<span className="pd-discount">{details.discount}</span>
					</div>
					<div className="pd-offers-block">
						<h4>Available offers</h4>
						<ul>
							{details.offers.map((offer, idx) => (
								<li key={idx}>{offer}</li>
							))}
						</ul>
					</div>
					<div className="pd-details-block">
						<h4>Product Details</h4>
						<p>{details.details}</p>
					</div>
				</div>
				<div className="product-detail-amazonlike-buybox">
					<div className="pd-buybox-price">₹{product.price}</div>
					<div className="pd-buybox-discount">{details.discount}</div>
					<button
						className="pd-buybox-buynow"
						onMouseDown={e => e.currentTarget.classList.add("active")}
						onMouseUp={e => e.currentTarget.classList.remove("active")}
						onMouseLeave={e => e.currentTarget.classList.remove("active")}
						onClick={() => {
							handlePlaceOrder();
							navigate("/checkout", { state: { product } });
						}}
					>
						Buy Now
					</button>
					<div className="pd-buybox-secure">Secure transaction</div>
					<div className="pd-buybox-delivery">FREE delivery: <span>Tomorrow</span></div>
					<div className="pd-buybox-stock">In stock</div>
				</div>
			</div>
			<style>
				{`
				.product-detail-amazonlike-main {
					display: flex;
					gap: 2.5rem;
					align-items: flex-start;
					justify-content: flex-start;
					max-width: 100vw;
					width: 100vw;
					margin: 0;
					background: #fff;
					border-radius: 0;
					box-shadow: none;
					padding: 2rem 0;
				}
				.product-detail-image-block {
					display: flex;
					flex-direction: row;
					align-items: flex-start;
					justify-content: flex-start;
				}
				.product-detail-thumbnails-vertical {
					display: flex;
					flex-direction: column;
					gap: 0.7rem;
					margin-right: 1rem;
					margin-left: 2vw; /* Add gap from the left side on large screens */
				}
				.product-detail-thumbnails-horizontal {
					display: none;
				}
				.product-detail-thumb-img {
					width: 54px;
					height: 54px;
					object-fit: cover;
					border-radius: 7px;
					border: 2px solid #eee;
					cursor: pointer;
					transition: border 0.2s;
					background: #fff;
					flex-shrink: 0;
				}
				.product-detail-thumb-img:hover {
					border: 2px solid #232526;
				}
				.product-detail-amazonlike-image {
					flex: 0 0 380px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: flex-start;
					background: #f6f7fb;
					border-radius: 10px;
					padding: 1rem;
					margin: 0 2rem 0 2rem;
					width: 100%;
					max-width: 420px;
				}
				.product-detail-amazonlike-image img {
					width: 100%;
					max-width: 340px;
					max-height: 420px;
					object-fit: contain;
					border-radius: 10px;
					background: #fff;
				}
				.product-detail-amazonlike-info {
					flex: 1 1 0;
					min-width: 0;
					padding-right: 1.5rem;
				}
				.product-detail-amazonlike-buybox {
					flex: 0 0 260px;
					background: #f6f7fb;
					border-radius: 10px;
					padding: 1.2rem 1rem;
					box-shadow: 0 2px 8px #23252611;
					display: flex;
					flex-direction: column;
					align-items: stretch;
					gap: 0.7rem;
					margin-left: 1.5rem;
				}
				.pd-title {
					font-size: 1.5rem;
					font-weight: 700;
					margin-bottom: 0.5rem;
				}
				.pd-rating-row {
					display: flex;
					align-items: center;
					gap: 1.2rem;
					margin-bottom: 0.4rem;
				}
				.pd-reviews {
					color: #555;
					font-size: 1rem;
				}
				.pd-price-row {
					display: flex;
					align-items: center;
					gap: 1.2rem;
					margin: 1rem 0 0.7rem 0;
				}
				.pd-price {
					font-size: 1.7rem;
					font-weight: 700;
					color: #232526;
				}
				.pd-discount {
					color: #388e3c;
					font-weight: 600;
					font-size: 1.1rem;
				}
				.pd-offers-block ul {
					margin: 0.3rem 0 0 1.2rem;
					padding: 0;
					font-size: 1rem;
				}
				.pd-details-block {
					margin-top: 1.2rem;
				}
				.pd-buybox-price {
					font-size: 1.5rem;
					font-weight: 700;
					color: #232526;
				}
				.pd-buybox-discount {
					color: #388e3c;
					font-weight: 600;
					font-size: 1.1rem;
				}
				.pd-buybox-buynow {
					background: #ff9900;
					color: #fff;
					border: none;
					border-radius: 7px;
					padding: 0.8rem 0;
					font-size: 1.1rem;
					font-weight: 700;
					cursor: pointer;
					margin: 0.7rem 0;
					transition: background 0.2s;
				}
				.pd-buybox-buynow.active,
				.pd-buybox-buynow:active {
					background: #e68a00;
				}
				@media (max-width: 1100px) {
					.product-detail-amazonlike-main {
						gap: 1.2rem;
						padding: 1.2rem 0;
					}
					.product-detail-amazonlike-image {
						flex-basis: 220px;
						max-width: 320px;
						padding: 0.5rem;
						margin: 0 1rem 0 1rem;
					}
					.product-detail-amazonlike-buybox {
						flex-basis: 200px;
						max-width: 200px;
						padding: 1rem 0.7rem;
					}
				}
				@media (max-width: 900px) {
					.product-detail-amazonlike-main {
						flex-direction: column;
						align-items: stretch;
						padding: 1rem 0;
						gap: 1.5rem;
					}
					.product-detail-image-block {
						flex-direction: column;
						align-items: center;
						justify-content: flex-start;
					}
					.product-detail-thumbnails-vertical {
						display: none;
						margin-left: 0;
					}
					.product-detail-thumbnails-horizontal {
						display: flex;
						flex-direction: row;
						gap: 0.5rem;
						margin-top: 1rem;
						overflow-x: auto;
						width: 100%;
						padding-bottom: 0.3rem;
						scrollbar-width: thin;
					}
					.product-detail-thumbnails-horizontal::-webkit-scrollbar {
						height: 6px;
					}
					.product-detail-thumbnails-horizontal::-webkit-scrollbar-thumb {
						background: #e0e0e0;
						border-radius: 4px;
					}
				}
				@media (max-width: 600px) {
					.product-detail-amazonlike-main {
						padding: 0.5rem 0;
						border-radius: 0;
						box-shadow: none;
						margin: 0.5rem 0;
					}
					.product-detail-amazonlike-image {
						max-width: 100vw;
						padding: 0.2rem;
					}
					.product-detail-amazonlike-image img {
						max-width: 95vw;
						max-height: 220px;
					}
					.product-detail-thumbnails-horizontal {
						gap: 0.3rem;
					}
					.product-detail-thumb-img {
						width: 38px;
						height: 38px;
					}
				}
				`}
			</style>
		</div>
	);
};

export default ProductDetail;
