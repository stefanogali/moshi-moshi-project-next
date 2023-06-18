"use-client";

import {useStore} from "@/app/hook-store/store";
import {sumTotal} from "@/helper-functions/helpers";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./CheckoutSummary.module.scss";

export default function CheckoutSummary() {
	const store = useStore()[0];

	return (
		<Row className={styles["row-checkout-summary"]}>
			<Col xs={6}>
				<ul>
					<li>
						<h5>Sub-total</h5>
						<h5>£{sumTotal(store.products)}</h5>
					</li>
					<li>
						<h5>Delivery cost</h5>
						<h5>£0</h5>
					</li>
					<li>
						<h5>Total</h5>
						<h5>£{sumTotal(store.products)}</h5>
					</li>
				</ul>
			</Col>
		</Row>
	);
}
