import React from "react";
import { FaStar } from "react-icons/fa";

const hoodies = [
	{
		id: 1,
		name: "Alan Jones Clothing Men's Hoodie",
		price: 899,
		rating: 4.6,
		reviews: 130,
		image: "https://m.media-amazon.com/images/I/61n8wQy4VGL._AC_UL480_FMwebp_QL65_.jpg",
		bestseller: true,
	},
	{
		id: 2,
		name: "Campus Sutra Men's Pullover Hoodie",
		price: 999,
		rating: 4.4,
		reviews: 80,
		image: "https://m.media-amazon.com/images/I/71w7%2B8QkQzL._AC_UL480_FMwebp_QL65_.jpg",
		bestseller: false,
	},
	{
		id: 3,
		name: "Veirdo Men's Printed Hoodie",
		price: 1099,
		rating: 4.8,
		reviews: 170,
		image: "https://m.media-amazon.com/images/I/81p3LITl%2BgL._AC_UL480_FMwebp_QL65_.jpg",
		bestseller: true,
	},
	{
		id: 4,
		name: "Ben Martin Men's Zip-up Hoodie",
		price: 1199,
		rating: 4.2,
		reviews: 60,
		image: "https://m.media-amazon.com/images/I/61pQK4l%2BQwL._AC_UL480_FMwebp_QL65_.jpg",
		bestseller: false,
	},
];

const HoodiesPage = () => (
	<div
		style={{
			background: "#f6f7fb",
			minHeight: "100vh",
			padding: 0,
			margin: 0,
			width: "100vw",
		}}
	>
		<div
			style={{
				background: "linear-gradient(90deg, #fff 60%, #e3f2fd 100%)",
				padding: "2.5rem 0 1.5rem 0",
				textAlign: "center",
				marginBottom: 24,
			}}
		>
			<h1
				style={{
					fontSize: "2.5rem",
					fontWeight: 900,
					color: "#232526",
					marginBottom: 8,
				}}
			>
				Hoodies
			</h1>
			<div
				style={{ fontSize: "1.2rem", color: "#555" }}
			>
				Comfy hoodies for every season. Bestsellers, new arrivals, and more!
			</div>
		</div>
		<div
			style={{
				display: "flex",
				gap: 24,
				maxWidth: "100vw",
				margin: "0",
				padding: "0 0 0 0",
				alignItems: "flex-start",
			}}
		>
			<aside
				style={{
					background: "#fff",
					borderRadius: 10,
					boxShadow: "0 2px 8px #e0e0e0",
					padding: "1.2rem",
					minWidth: 220,
					maxWidth: 260,
					flex: "0 0 220px",
				}}
			>
				<div
					style={{
						fontWeight: 700,
						fontSize: 18,
						marginBottom: 16,
					}}
				>
					Filters
				</div>
				<div style={{ marginBottom: 12 }}>
					<div
						style={{ fontWeight: 600, marginBottom: 6 }}
					>
						Price
					</div>
					<div>
						<input type="checkbox" id="p1" />{" "}
						<label htmlFor="p1">Under ₹1000</label>
						<br />
						<input type="checkbox" id="p2" />{" "}
						<label htmlFor="p2">₹1000 - ₹1200</label>
						<br />
						<input type="checkbox" id="p3" />{" "}
						<label htmlFor="p3">Above ₹1200</label>
					</div>
				</div>
				<div style={{ marginBottom: 12 }}>
					<div
						style={{ fontWeight: 600, marginBottom: 6 }}
					>
						Customer Review
					</div>
					<div>
						{[4, 3, 2, 1].map((star) => (
							<span
								key={star}
								style={{ color: "#fbc02d", marginRight: 8 }}
							>
								{[...Array(star)].map((_, i) => (
									<FaStar key={i} />
								))}
								&nbsp; & Up
							</span>
						))}
					</div>
				</div>
				<div>
					<div
						style={{ fontWeight: 600, marginBottom: 6 }}
					>
						Type
					</div>
					<div>
						<input type="checkbox" id="type1" />{" "}
						<label htmlFor="type1">Pullover</label>
						<br />
						<input type="checkbox" id="type2" />{" "}
						<label htmlFor="type2">Zip-up</label>
					</div>
				</div>
			</aside>
			<main style={{ flex: 1 }}>
				<div style={{ marginBottom: 24 }}>
					<div
						style={{
							fontWeight: 800,
							fontSize: 22,
							color: "#232526",
							marginBottom: 10,
						}}
					>
						Bestsellers
					</div>
					<div
						style={{
							display: "flex",
							gap: 18,
							flexWrap: "wrap",
						}}
					>
						{hoodies
							.filter((h) => h.bestseller)
							.map((hoodie) => (
								<div
									key={hoodie.id}
									style={{
										background: "#fff",
										borderRadius: 12,
										boxShadow: "0 2px 8px #e0e0e0",
										padding: "1rem",
										minWidth: 220,
										maxWidth: 240,
										flex: "1 1 220px",
										textAlign: "center",
										position: "relative",
									}}
								>
									<img
										src={hoodie.image}
										alt={hoodie.name}
										style={{
											width: "100%",
											height: 180,
											objectFit: "cover",
											borderRadius: 8,
											marginBottom: 10,
											background: "#f6f7fb",
										}}
									/>
									<div
										style={{
											fontWeight: 700,
											fontSize: 17,
											color: "#232526",
										}}
									>
										{hoodie.name}
									</div>
									<div
										style={{
											color: "#1976d2",
											fontWeight: 700,
											fontSize: 16,
										}}
									>
										₹{hoodie.price}
									</div>
									<div
										style={{
											color: "#fbc02d",
											fontWeight: 600,
											fontSize: 15,
										}}
									>
										{[...Array(Math.floor(hoodie.rating))].map(
											(_, i) => <FaStar key={i} />
										)}
										<span
											style={{
												color: "#888",
												fontWeight: 500,
												fontSize: 14,
											}}
										>
											{" "}
											({hoodie.reviews})
										</span>
									</div>
									<span
										style={{
											position: "absolute",
											top: 10,
											right: 10,
											background: "#f9a825",
											color: "#fff",
											fontWeight: 700,
											fontSize: 13,
											borderRadius: 6,
											padding: "2px 10px",
										}}
									>
										Bestseller
									</span>
								</div>
							))}
					</div>
				</div>
				<div>
					<div
						style={{
							fontWeight: 800,
							fontSize: 22,
							color: "#232526",
							marginBottom: 10,
						}}
					>
						All Hoodies
					</div>
					<div
						style={{
							display: "flex",
							gap: 18,
							flexWrap: "wrap",
						}}
					>
						{hoodies.map((hoodie) => (
							<div
								key={hoodie.id}
								style={{
									background: "#fff",
									borderRadius: 12,
									boxShadow: "0 2px 8px #e0e0e0",
									padding: "1rem",
									minWidth: 220,
									maxWidth: 240,
									flex: "1 1 220px",
									textAlign: "center",
									position: "relative",
								}}
							>
								<img
									src={hoodie.image}
									alt={hoodie.name}
									style={{
										width: "100%",
										height: 180,
										objectFit: "cover",
										borderRadius: 8,
										marginBottom: 10,
										background: "#f6f7fb",
									}}
								/>
								<div
									style={{
										fontWeight: 700,
										fontSize: 17,
										color: "#232526",
									}}
								>
									{hoodie.name}
								</div>
								<div
									style={{
										color: "#1976d2",
										fontWeight: 700,
										fontSize: 16,
									}}
								>
									₹{hoodie.price}
								</div>
								<div
									style={{
										color: "#fbc02d",
										fontWeight: 600,
										fontSize: 15,
									}}
								>
									{[...Array(Math.floor(hoodie.rating))].map(
										(_, i) => <FaStar key={i} />
									)}
									<span
										style={{
											color: "#888",
											fontWeight: 500,
											fontSize: 14,
										}}
									>
										{" "}
										({hoodie.reviews})
									</span>
								</div>
								{hoodie.bestseller && (
									<span
										style={{
											position: "absolute",
											top: 10,
											right: 10,
											background: "#f9a825",
											color: "#fff",
											fontWeight: 700,
											fontSize: 13,
											borderRadius: 6,
											padding: "2px 10px",
										}}
									>
										Bestseller
									</span>
								)}
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	</div>
);

export default HoodiesPage;
