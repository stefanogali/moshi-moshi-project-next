"use client";

import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {useState, useEffect} from "react";
import {useStore} from "@/app/hook-store/store";
import {sumTotal} from "@/helper-functions/helpers";
import CardProductCheckout from "../CardProductCheckout/CardProductCheckout";
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";
import PaypalButtons from "../PaypalButtons/PaypalButtons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CheckoutProducts.module.scss";

const initialOptions = {
	clientId: process.env.NEXT_PUBLIC_CLIENT_SELLER_ID,
	currency: "GBP",
	intent: "capture",
};

export default function CheckoutProducts() {
	const [checkoutProducts, setCheckoutProducts] = useState([]);
	const store = useStore()[0];
	console.log("store", store);

	useEffect(() => {
		let productsFromLocalStorage = window.localStorage.getItem("cartProducts");
		productsFromLocalStorage = JSON.parse(productsFromLocalStorage);
		if (new Date().getTime() > Date.parse(productsFromLocalStorage?.expiry)) {
			window.localStorage.removeItem("cartProducts");
			setProductsInCart([]);
			return;
		}
		if (store.products.length === 0 && productsFromLocalStorage?.products.length === 0) {
			setCheckoutProducts([]);
			return;
		}
		if (store.products.length === 0 && productsFromLocalStorage?.products.length > 0) {
			setCheckoutProducts(productsFromLocalStorage?.products);
			return;
		}
		setCheckoutProducts(store.products);
	}, []);
	// console.log("checkoutProducts", checkoutProducts);

	return (
		<PayPalScriptProvider options={initialOptions}>
			<div className={styles["products-checkout-container"]}>
				<Container>
					<CheckoutSummary totalAmount={sumTotal(checkoutProducts)} />
					<Row>
						<Col>
							{checkoutProducts.map((product, index) => {
								return <CardProductCheckout key={index} productImage={product.productImage} productName={product.name} size={product.selectedSize} />;
							})}
						</Col>
					</Row>
					<Row className={styles["row-paypal-buttons"]}>
						<Col xs={4} className={styles["paypal-button-container"]}>
							<PaypalButtons products={checkoutProducts} />
						</Col>
					</Row>
					<Row className={styles["row-checkout-text"]}>
						<Col xs={8}>
							<p>Please click on the button below to place your order.</p>
							<p>You can pay using your PayPal account or your Credit/Debit card. You will add your delivery details during the checkout process.</p>
						</Col>
					</Row>
				</Container>
			</div>
		</PayPalScriptProvider>
	);
}
