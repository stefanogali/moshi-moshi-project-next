"use client";

import Script from "next/script";
import {useState} from "react";
import Spinner from "@/app/global-components/Spinner/Spinner";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./ContactForm.module.scss";

const initialFormState = {
	isEmailSent: false,
	errorFields: [],
	errorAnimation: [],
	isEmailServerError: false,
};

export default function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formResults, setFormResults] = useState(initialFormState);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const genericError = "Ooops something went wrong. Please try to submit again or email me at info@moshimoshiproject.co.uk";

	const validateCaptcha = () => {
		return new Promise((res, rej) => {
			grecaptcha.ready(() => {
				grecaptcha
					.execute(`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`, {
						action: "submit",
					})
					.then((token) => {
						return res(token);
					});
			});
		});
	};

	const frontendValidation = (fieldNames) => {
		let errors = [];

		fieldNames.forEach((item) => {
			if (item.nameOfField === "name" && (item.value.length < 2 || /\d/.test(item.value) || item.value.length > 30)) {
				errors.push({errorField: "name", errorValue: "Invalid Name"});
			}

			if (item.nameOfField === "email" && (item.value.length < 4 || item.value.indexOf("@") < 0 || item.value.length > 60)) {
				errors.push({errorField: "email", errorValue: "Invalid Email"});
			}

			if (item.nameOfField === "message" && (item.value.length < 4 || item.value.length > 600)) {
				errors.push({errorField: "message", errorValue: "Message must be between 4 and 600 characters"});
			}
		});

		return errors;
	};

	const onChangeHandler = (event) => {
		const formElId = event.target.id;
		setFormResults(initialFormState);
		setIsFormSubmitted(false);

		switch (formElId) {
			case "name":
				setName(event.target.value);
				break;
			case "email":
				setEmail(event.target.value);
				break;
			case "message":
				setMessage(event.target.value);
				break;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setIsFormSubmitted(false);

		const frontendErrors = frontendValidation([
			{
				nameOfField: "name",
				value: name,
			},
			{
				nameOfField: "email",
				value: email,
			},
			{
				nameOfField: "message",
				value: message,
			},
		]);

		if (frontendErrors.length > 0) {
			setFormResults({
				isEmailSent: false,
				isEmailServerError: false,
				errorFields: frontendErrors,
				errorAnimation: frontendErrors.map((error) => error.errorField),
			});
			return;
		}
		setIsLoading(true);

		setFormResults(initialFormState);

		try {
			const recaptchaToken = await validateCaptcha();

			const objFormData = {
				name: name,
				email: email,
				message: message,
				token: recaptchaToken,
			};

			const postFormRequest = await fetch(`${window.location.origin}/api/send-email`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(objFormData),
			});

			const response = await postFormRequest.json();
			console.log("response", response);

			if (response.status === 200) {
				setName("");
				setEmail("");
				setMessage("");
				setFormResults({
					isEmailSent: true,
					errorFields: [],
					errorAnimation: [],
					isEmailServerError: false,
				});
				return;
			}

			if (response.status === 422) {
				setFormResults({
					isEmailSent: false,
					isEmailServerError: false,
					errorFields: response.errors,
					errorAnimation: response.errors.map((error) => error.errorField),
				});
				return;
			}

			setFormResults({
				isEmailSent: false,
				errorAnimation: [],
				isEmailServerError: true,
				errorFields: [{errorField: "submit", errorValue: response.errorValue || genericError}],
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsFormSubmitted(true);
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className={styles["contact-main"]} id="contacts">
				<Container className={styles["form-container"]}>
					<Row>
						<Col>
							<h2 className={styles.title}>Contact us!</h2>
							<p>Drop us a message</p>
						</Col>
					</Row>

					<Row>
						<Col>
							<Form className={styles["contact-form"]} onSubmit={(event) => handleSubmit(event)}>
								<Form.Group className="mb-3">
									<Row>
										<Col>
											<div className={`${styles["form-element"]}${formResults.errorAnimation.includes("name") ? ` ${styles.shake}` : ""}`}>
												<Form.Control type="text" id="name" name="name" placeholder="Your name" className={styles["form-input"]} value={name} onChange={(event) => onChangeHandler(event)} />
											</div>
											{formResults.errorFields.length > 0 && (
												<div className={styles["input-form-error"]}>
													<p className={styles["error-detail"]}>
														{formResults.errorFields.map((result) => {
															if (result.errorField === "name") {
																return result.errorValue;
															}
														})}
													</p>
												</div>
											)}
										</Col>
										<Col>
											<div className={`${styles["form-element"]}${formResults.errorAnimation.includes("email") ? ` ${styles.shake}` : ""}`}>
												<Form.Control type="text" id="email" name="email" placeholder="Your email" className={styles["form-input"]} value={email} onChange={(event) => onChangeHandler(event)} />
												{formResults.errorFields.length > 0 && (
													<div className={styles["input-form-error"]}>
														<p className={styles["error-detail"]}>
															{formResults.errorFields.map((result) => {
																if (result.errorField === "email") {
																	return result.errorValue;
																}
															})}
														</p>
													</div>
												)}
											</div>
										</Col>
									</Row>
								</Form.Group>
								<Form.Group className="mb-3">
									<div className={`${styles["form-element"]}${formResults.errorAnimation.includes("message") ? ` ${styles.shake}` : ""}`}>
										<Form.Control as="textarea" rows={10} placeholder="Your message" className={styles["form-textarea"]} id="message" name="message" type="text" value={message} onChange={(event) => onChangeHandler(event)} />
										{formResults.errorFields.length > 0 && (
											<div className={`${styles["input-form-error"]} ${styles["input-textarea"]}`}>
												<p className={styles["error-detail"]}>
													{formResults.errorFields.map((result) => {
														if (result.errorField === "message") {
															return result.errorValue;
														}
													})}
												</p>
											</div>
										)}
										<p className={styles["message-info"]}>Max 600 characters</p>
									</div>
								</Form.Group>
								{isLoading ? (
									<Spinner isContactFormLoader={true} />
								) : (
									<Button type="submit" className={styles["send-message-btn"]}>
										Send it!
									</Button>
								)}
							</Form>
							{/* result of sending the form */}
							<div className={styles["contact-form-result-container"]}>
								{isFormSubmitted && formResults.errorFields.length === 0 && formResults.isEmailSent ? (
									<div className={`${styles["contact-form-result"]} ${styles.success}`}>
										<p>Thanks for submitting the form!</p>
									</div>
								) : (
									formResults.isEmailServerError && (
										<div className={`${styles["contact-form-result"]} ${styles.failure}`}>
											<p>{formResults.errorFields[0].errorValue}</p>
										</div>
									)
								)}
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} />
		</>
	);
}
