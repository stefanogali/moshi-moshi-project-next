import {useStore} from "@/app/hook-store/store";
import Button from "react-bootstrap/Button";
import styles from "./AddToCartBtn.module.scss";

export default function AddToCartBtn({
	isActive,
	productImage,
	id,
	selectedSize,
	price,
	description,
}) {
	const dispatch = useStore(false)[1];

	console.log("rendering add to cart button");

	const addProduct = () => {
		dispatch("ADD_PRODUCTS", {
			productImage,
			id,
			selectedSize,
			price,
			description,
		});
	};

	return isActive ? (
		<div className={styles["buy-btn-container"]}>
			<Button className={styles["buy-btn"]} onClick={() => addProduct()}>
				Add to cart
			</Button>
		</div>
	) : null;
}
