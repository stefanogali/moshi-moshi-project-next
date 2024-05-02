"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./About.module.scss";

const paninoText = `Hey there!! My name is Panino and I am happy if you are visiting our website and if you like our cool stuff. I met Mai many years ago while I was traveling in Japan, and since then we have seen each other so many times and we've always been keeping in touch. We decided to do this project last time we met in London...the reason?? First to enjoy ourselves, and also boost 🔥 our creativity. We want to designs stuffs inspired by rock bands we really love... Gabba Gabba Hey!`;
const maiText = `Hi !! My name is Mai and I live in Osaka, which is a super fantastic city you must visit one day! I am so happy to draw cute illustrations 🖊️ for our t-shirts, and I always take my marker pens with me everywhere I go. One day by chance I met this strange guy Panino. While we were in London laughing 😁 about something silly, as we always do, we decided to create something where we could be totally free to express ourselves.. Moshi Moshi Project!`;

const AboutRow = ({faceImage, text}) => (
	<Row className={styles["about-row"]}>
		<Col lg={4} className={styles["face-container"]}>
			{" "}
			<img className={styles["face-image"]} src={`./${faceImage}.png`} />
		</Col>
		<Col lg={8} className={styles["about-text-container"]}>
			<p className={styles["about-text"]}>{text}</p>
		</Col>
	</Row>
);

export default function About() {
	return (
		<div className={styles["about-main"]}>
			<Container id="about">
				<AboutRow faceImage="panino-face" text={paninoText} />
				<AboutRow faceImage="mai-face" text={maiText} />
			</Container>
		</div>
	);
}
