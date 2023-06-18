import styles from "./CardProductCheckout.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CardProductCheckout({productImage, productName, size}) {
	return (
		<Row className={styles["row-product-checkout"]}>
			<Col className={styles["col-product-checkout"]} xs={8}>
				<div className={styles["product-container"]}>
					<div className={styles["product-image-container"]}>
						<img
							className={styles["product-image"]}
							src={`./product-images/${productImage}`}
						/>
					</div>
					<div className={styles["product-description"]}>
						<h2 className={styles["product-name"]}>
							{productName}
						</h2>
						<h4 className={styles["product-size"]}>
							{" "}
							- Size: {size}
						</h4>
					</div>
				</div>
			</Col>
		</Row>
	);
}
