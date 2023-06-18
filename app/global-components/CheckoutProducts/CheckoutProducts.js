"use client";

import {useStore} from "@/app/hook-store/store";
import CardProductCheckout from "../CardProductCheckout/CardProductCheckout";
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CheckoutProducts.module.scss";

export default function CheckoutProducts() {
	const store = useStore()[0];
	console.log("store", store);

	return (
		<div className={styles["products-checkout-container"]}>
			<Container>
				<CheckoutSummary />
				<Row>
					<Col>
						{store.products.map((product, index) => {
							return (
								<CardProductCheckout
									key={index}
									productImage={product.productImage}
									productName={product.name}
									size={product.selectedSize}
								/>
							);
						})}
					</Col>
				</Row>
				<Row className={styles["row-checkout-text"]}>
					<Col xs={8}>
						<p>
							Please click on the button below to place your
							order.
						</p>
						<p>
							You can pay using your PayPal account or your
							Credit/Debit card. You will add your delivery
							details during the checkout process.
						</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
