import styles from "./CardProductCheckout.module.scss";

export default function CardProductCheckout({productImage, productName, size}) {
	return (
		<div className={styles["row-product-checkout"]}>
			<div className={styles["col-product-checkout"]}>
				<div className={styles["product-container"]}>
					<div className={styles["product-image-container"]}>
						<img className={styles["product-image"]} src={`./product-images/${productImage}`} />
					</div>
					<div className={styles["product-description"]}>
						<h2 className={styles["product-name"]}>{productName}</h2>
						<h4 className={styles["product-size"]}> - Size: {size}</h4>
					</div>
				</div>
			</div>
		</div>
	);
}
