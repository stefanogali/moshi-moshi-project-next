"use client";

import dynamic from "next/dynamic";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {useState, useEffect} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useStore} from "@/app/hook-store/store";
import {sumTotal} from "@/helper-functions/helpers";
import CardProductCheckout from "../CardProductCheckout/CardProductCheckout";
const Confetti = dynamic(() => import("../Confetti/Confetti"), {ssr: false});
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
	const [isPaypalError, setIsPaypalError] = useState(false);
	const [isConfettiVisible, setIsConfettiVisible] = useState(false);
	const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);

	const pathname = usePathname();
	const store = useStore()[0];

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

	useEffect(() => {
		setIsConfettiVisible(false);
	}, [pathname]);

	return (
		<PayPalScriptProvider options={initialOptions}>
			{isConfettiVisible && <Confetti />}
			<div className={styles["products-checkout-container"]}>
				<Container>
					<CheckoutSummary totalAmount={sumTotal(checkoutProducts)} />
					<Row className="justify-content-center">
						<Col xs={12} md={8}>
							{checkoutProducts.map((product, index) => {
								return <CardProductCheckout key={index} productImage={product.productImage} productName={product.name} size={product.selectedSize} />;
							})}
						</Col>
					</Row>
					{!isPaypalError && !isTransactionSuccess ? (
						<>
							<div className={styles["row-paypal-buttons"]}>
								<div className={styles["paypal-button-container"]}>
									<PaypalButtons products={checkoutProducts} setIsPaypalError={setIsPaypalError} setIsTransactionSuccess={setIsTransactionSuccess} setIsConfettiVisible={setIsConfettiVisible} />
								</div>
							</div>

							<div className={styles["row-checkout-text"]}>
								<div>
									<p>You can pay using your PayPal account or your Credit/Debit card. You will add your delivery details during the checkout process.</p>
								</div>
							</div>
						</>
					) : isTransactionSuccess ? (
						<Row className={styles["row-transaction-success"]}>
							<Col>
								<h3 className={styles["transaction-success"]}>
									<span>&#x1F4E2;</span> Thanks a lot for your order! <span className={styles["emoji-flipped"]}>&#x1F4E2;</span>
								</h3>
								<p>Your items will be shipped soon, and should be with you in no more than 6 working days!</p>
							</Col>
						</Row>
					) : (
						<Row className={styles["row-transaction-error"]}>
							<Col>
								<h3>Oooooops....something went wrong here!</h3>
								<p>
									Please go back to the <Link href="/">home page</Link> and try again, or send us an email at info@moshimoshiproject.co.uk and we will take care of it!
								</p>
							</Col>
						</Row>
					)}
				</Container>
			</div>
		</PayPalScriptProvider>
	);
}
