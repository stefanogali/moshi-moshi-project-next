import {useEffect, useState, useRef} from "react";
import styles from "./Cart.module.scss";

export default function Cart() {
	const [sidebarTop, setSidebarTop] = useState();
	const [attach, setAttach] = useState(false);
	const shoppingCartRef = useRef();

	const clickHandler = () => {
		console.log("clicked");
	};

	const detectScrolled = () => {
		const scrollTop = window.pageYOffset;
		if (scrollTop >= shoppingCartRef.current.offsetParent.offsetTop + 30) {
			setAttach(true);
		} else {
			setAttach(false);
		}
	};

	useEffect(() => {
		if (window.pageYOffset > 50) {
			detectScrolled();
		}

		window.addEventListener("scroll", detectScrolled);
		return () => {
			window.removeEventListener("scroll", detectScrolled);
		};
	}, []);

	console.log("attach", attach);

	return (
		<div
			className={`${styles["shopping-cart"]} ${
				attach ? ` ${styles.fixed}` : ""
			}`}
			ref={shoppingCartRef}
			onClick={clickHandler}
		>
			<div className={styles["cart-icon-container"]}>
				<img className={styles["cart-icon"]} src={`./cart.png`} />
			</div>
			<div className={styles["delivery-details"]}>
				<h3 className={styles["delivery-title"]}>
					Deliveries in all UK!
				</h3>
				<p>
					We delivery only in UK, and it can take up to 6 working
					days. The shipping cost is included with our t-shirts
					prices! If we do not have the item you chosen in stock, the
					delivery can take longer. Get yourself this amazing Japanese
					style T-Shirt designed for rebel girls.
				</p>
				<b>
					Machine wash cold (30°C) - do not bleach - do not tumble dry
					- iron low - do not dry clean -
				</b>
				<p>
					You can order up to 5 items from this website. If you would
					like to order more items or ask something to us, please fill
					the form below, or send us an email at
					info@moshimoshiproject.co.uk. Panino and Mai are super happy
					to answer all your questions!
				</p>
			</div>
		</div>
	);
}
