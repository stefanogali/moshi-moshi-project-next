import {useEffect, useState, useRef} from "react";
import {useStore} from "@/app/hook-store/store";
import {sumTotal} from "@/helper-functions/helpers";
import Link from "next/link";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import styles from "./Cart.module.scss";

export default function Cart() {
	const [showCart, setShowCart] = useState(false);
	const [attach, setAttach] = useState(false);
	const [target, setTarget] = useState(null);
	const [productsInCart, setProductsInCart] = useState([]);
	const shoppingCartContainerRef = useRef();
	const [store, dispatch] = useStore();

	const clickHandler = (event) => {
		setShowCart((prev) => !prev);
		setTarget(event.target);
	};

	const removeProductClickHandler = (id) => {
		dispatch("REMOVE_PRODUCT", {
			id,
		});

		if (store.products.length === 0) {
			let productsFromLocalStorage = window.localStorage.getItem("cartProducts");
			productsFromLocalStorage = JSON.parse(productsFromLocalStorage);
			if (productsFromLocalStorage.products.length === 0) {
				setProductsInCart([]);
				setShowCart(false);
			}
		}
	};

	const detectScrolled = () => {
		const scrollTop = window.scrollY;
		if (scrollTop >= shoppingCartContainerRef.current.offsetParent.offsetTop + 30) {
			setAttach(true);
		} else {
			setAttach(false);
		}
	};

	useEffect(() => {
		if (window.scrollY > 50) {
			detectScrolled();
		}

		window.addEventListener("scroll", detectScrolled);
		return () => {
			window.removeEventListener("scroll", detectScrolled);
		};
	}, []);

	useEffect(() => {
		let productsFromLocalStorage = window.localStorage.getItem("cartProducts");
		productsFromLocalStorage = JSON.parse(productsFromLocalStorage);

		if (new Date().getTime() > Date.parse(productsFromLocalStorage?.expiry)) {
			window.localStorage.removeItem("cartProducts");
			setProductsInCart([]);
			return;
		}
		setProductsInCart(productsFromLocalStorage?.products || []);
	}, []);

	useEffect(() => {
		if (store.products.length === 0) {
			setShowCart(false);
		} else {
			setProductsInCart(store.products);
		}
	}, [store.products.length]);

	return (
		<div className={`${styles["shopping-cart"]} ${attach ? ` ${styles.fixed}` : ""}`} ref={shoppingCartContainerRef}>
			<div className={styles["cart-icon-container"]} onClick={clickHandler}>
				<img className={styles["cart-icon"]} src={`./cart.png`} />
				{productsInCart.length ? <div className={styles["number-items-in-cart"]}>{productsInCart.length}</div> : null}
			</div>
			<Overlay rootClose show={showCart} placement="left" target={target} container={shoppingCartContainerRef}>
				<Popover id={`popover`} className={styles["popover-cart"]}>
					<Popover.Body className={styles["popover-cart-body"]}>
						<CloseButton
							className={styles["popover-close-btn"]}
							onClick={() => {
								setShowCart(false);
							}}
						/>
						{productsInCart.length === 0 ? (
							<div className={"cart-empty-container"}>
								<strong>Your cart is empty!</strong>
								<p>Try to add a product first</p>
							</div>
						) : (
							<div className={styles["cart-products-container"]}>
								{productsInCart.map((product, index) => (
									<div className={styles["cart-product"]} key={index}>
										<div className={styles["product-image"]}>
											{" "}
											<img className={styles["product-image"]} src={`./product-images/${product.productImage}`} />
										</div>
										<div className={styles["product-details"]}>
											<strong>Your t-shirt:</strong>
											<p>{product.name}</p>
											<div className={styles["product-spec"]}>
												<p>£{product.price}</p>
												<p>Size: {product.selectedSize}</p>
											</div>

											<p className={styles["remove-item"]} onClick={removeProductClickHandler.bind(null, product.id)}>
												<img className={styles["bin-image"]} src={`./garbage.svg`} />
												<span className={styles["remove-text"]}>Remove item</span>
											</p>
										</div>
									</div>
								))}
								<div className={styles["total-price"]}>
									<p>Total price</p>
									<strong>£{sumTotal(productsInCart)}</strong>
								</div>
								<div className={styles["checkout-button-container"]}>
									<Link href="/checkout">
										<Button className={styles["checkout-btn"]}>Checkout</Button>
									</Link>
								</div>
							</div>
						)}
					</Popover.Body>
				</Popover>
			</Overlay>

			<div className={styles["delivery-details"]}>
				<h3 className={styles["delivery-title"]}>Deliveries in all UK!</h3>
				<p>We delivery only in UK, and it can take up to 6 working days. The shipping cost is included with our t-shirts prices! If we do not have the item you chosen in stock, the delivery can take longer. Get yourself this amazing Japanese style T-Shirt designed for rebel girls.</p>
				<b>Machine wash cold (30°C) - do not bleach - do not tumble dry - iron low - do not dry clean -</b>
				<p>You can order up to 5 items from this website. If you would like to order more items or ask something to us, please fill the form below, or send us an email at info@moshimoshiproject.co.uk. Panino and Mai are super happy to answer all your questions!</p>
			</div>
		</div>
	);
}
