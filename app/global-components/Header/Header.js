"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Image from "next/image";
import {Monoton, Sniglet} from "next/font/google";

import Navigation from "../Navigation/Navigation";

import styles from "./Header.module.scss";

const monoton = Monoton({
	weight: ["400"],
	subsets: ["latin"],
});

const sniglet = Sniglet({
	weight: ["400", "800"],
	subsets: ["latin"],
});
//store initiated here since in layout will trow error because of server component
import configureStore from "@/app/hook-store/products-store";

configureStore();

export default function Header() {
	return (
		<header className={styles.header}>
			<Container fluid>
				<Row>
					<Col className={styles["logo-container"]}>
						<Image
							src="/logo.svg"
							alt="Moshi Moshi Project Logo"
							className={styles["header-logo"]}
							width={200}
							height={200}
							// priority
						/>
					</Col>
				</Row>
				<Row>
					<Col className={styles["logo-text-container"]}>
						<h1 className={monoton.className}>
							Moshi Moshi Project
						</h1>
					</Col>
				</Row>
				<Row>
					<Col className={styles["logo-subtext-container"]}>
						<h5 className={sniglet.className}>
							Japanese design T-shirts
						</h5>
					</Col>
				</Row>
				<Navigation />
			</Container>
		</header>
	);
}
