"use client";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ContactForm.module.scss";

export default function ContactForm() {
	return (
		<div className={styles["contact-main"]}>
			<Container className={styles["form-container"]}>
				<Row>
					<Col>
						<h2 className={styles.title}>Contact us!</h2>
						<p>Drop us a message</p>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form className={styles["contact-form"]}>
							<Form.Group
								className="mb-3"
								controlId="ControlInput1"
							>
								<Row>
									<Col>
										<Form.Control
											type="text"
											placeholder="Your name"
											className={styles["form-input"]}
										/>
									</Col>
									<Col>
										<Form.Control
											type="text"
											placeholder="Your email"
											className={styles["form-input"]}
										/>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="ControlTextarea1"
							>
								<Form.Control
									as="textarea"
									rows={10}
									placeholder="Your message"
									className={styles["form-textarea"]}
								/>
							</Form.Group>
							<Button className={styles["send-message-btn"]}>
								Send it
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
