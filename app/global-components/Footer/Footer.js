"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<Container>
			<Row>
				<Col>
					<footer className={styles.footer}>
						<p className={styles.copyright}>
							© Moshi Moshi Project - Trademark Registered -
						</p>
						<p className={styles["photos-author"]}>
							Photos by Andrew Moi
						</p>
						<h5 className={styles["returns-title"]}>
							Exchange and Return
						</h5>
						<p className={styles.returns}>
							Any unworn items may be returned to us for an
							exchange or full refund within 28 days. Please fill
							the form to contact us. Refunds will only be given
							when the item is received and checked. If the item
							is faulty, please include details of the fault in
							the product return. If you are returning your item
							by post for an exchange we do ask that you pay the
							cost of postage.
						</p>
						<p className={styles.email}>
							info@moshimoshiproject.co.uk
						</p>
					</footer>
				</Col>
			</Row>
		</Container>
	);
}
