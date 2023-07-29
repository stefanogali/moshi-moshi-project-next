"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./About.module.scss";

export default function About() {
	return (
		<div className={styles["about-main"]}>
			<Container id="about">
				<Row className={styles["about-row"]}>
					<Col lg={4} className={styles["face-container"]}>
						{" "}
						<img className={styles["face-image"]} src={`./panino-face.png`} />
					</Col>
					<Col lg={8} className={styles["about-text-container"]}>
						<p className={styles["about-text"]}>
							Hey there!! My name is Panino and I am happy if you are visiting our website and if you like our cool stuff. I met Mai many years ago while I was traveling in &#127471;&#127477; Japan, and since then we have seen each other so many times and we&aposve always been keeping
							in touch. We decided to do this project last time we met in London...the reason?? First to enjoy ourselves, and also boost &#128293; our creativity. We want to designs stuffs inspired by rock bands we really love... Gabba Gabba Hey!
						</p>
					</Col>
				</Row>
				<Row className={styles["about-row"]}>
					<Col lg={4} className={styles["face-container"]}>
						{" "}
						<img className={styles["face-image"]} src={`./mai-face.png`} />
					</Col>
					<Col lg={8} className={styles["about-text-container"]}>
						<p className={styles["about-text"]}>
							Hi !! My name is Mai and I live in Osaka, which is a super fantastic city you must visit one day! I am so happy to draw cute illustrations &#x1f58a; for our t-shirts, and I always take my marker pens with me everywhere I go. One day by chance I met this strange guy
							Panino. While we were in London laughing &#128516; about something silly, as we always do, we decided to create something where we could be totally free to express ourselves.. Moshi Moshi Project!
						</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
