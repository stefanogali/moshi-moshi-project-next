"use client";

import Col from "react-bootstrap/Col";
import styles from "./Card.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Card({
	name,
	productImage,
	index,
	description,
	material,
	shortDescription,
	price,
	isActive,
	variablesCss,
}) {
	// frontend fetch
	// const getData = async () => {
	// 	const res = await fetch("http://localhost:3000/api/products", {
	// 		method: "GET",
	// 	});

	// 	const data = await res.json();
	// 	console.log("data", data);
	// 	return await data;
	// };

	// getData();
	// console.log("products in bootstrap container", products);

	return (
		<Col lg={4} className={styles["products-container"]}>
			<div className={styles["product-container"]}>
				<div className={styles["image-container"]}>
					<img
						className={styles["product-image"]}
						src={`./product-images/${productImage}`}
					/>
				</div>
				<div className={styles["product-specs"]}>
					<h4 className={styles["product-name"]}>{name}</h4>
					<h5 className={styles["product-description"]}>
						{description}
					</h5>
					<p className={styles["product-definition"]}>
						{material} {shortDescription}
					</p>
					<div className={styles["product-footer"]}>
						<div className={styles["select-container"]}>
							<Form.Select
								size="sm"
								aria-label="Select t-shirt size"
								className={styles["size-select"]}
							>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</Form.Select>
						</div>
						<div className={styles["price"]}>DB</div>
					</div>
					<Button className={styles["buy-btn"]}>Add to cart</Button>
				</div>
			</div>
		</Col>
	);
}
