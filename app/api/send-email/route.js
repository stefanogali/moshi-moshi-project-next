import {NextResponse} from "next/server";

const mailchimp = require("@mailchimp/mailchimp_transactional")(process.env.SEND_EMAIL_PRIVATE_KEY);

export async function POST(request) {
	const requestData = await request.json();
	const name = requestData.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const email = requestData.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const contactMessage = requestData.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const captchaToken = requestData.token;
	const genericError = "Ooops something went wrong. Please try to submit again, or email us at info@moshimoshiproject.co.uk";
	const expectedAction = "contact_form";
	const minScore = 0.7;
	const allowedHostnames = new Set(["moshimoshiproject.co.uk", "www.moshimoshiproject.co.uk"]);

	if (!captchaToken) {
		return NextResponse.json([{errorField: "submit", errorValue: "Ooops we are sorry but something went wrong. Please try to submit your form again."}], {status: 400});
	}

	if (!process.env.RECAPTCHA_PRIVATE_KEY) {
		console.error("reCAPTCHA private key is not configured.");
		return NextResponse.json([{errorField: "submit", errorValue: "Unable to verify form submission."}], {status: 500});
	}

	let responseRecaptcha;
	try {
		const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			body: new URLSearchParams({
				secret: process.env.RECAPTCHA_PRIVATE_KEY,
				response: captchaToken,
			}),
		});

		if (!verifyResponse.ok) {
			throw new Error(`reCAPTCHA verification returned ${verifyResponse.status}.`);
		}

		responseRecaptcha = await verifyResponse.json();
	} catch (error) {
		console.error("Unable to verify reCAPTCHA:", error);
		return NextResponse.json([{errorField: "submit", errorValue: "Unable to verify form submission."}], {status: 503});
	}

	if (responseRecaptcha.success !== true) {
		return NextResponse.json([{errorField: "submit", errorValue: "Captcha challenge failed."}], {status: 400});
	}

	if (responseRecaptcha.action !== expectedAction) {
		console.warn("Unexpected reCAPTCHA action:", responseRecaptcha.action);
		return NextResponse.json([{errorField: "submit", errorValue: "Invalid form action."}], {status: 400});
	}

	const verifiedHostname = typeof responseRecaptcha.hostname === "string" ? responseRecaptcha.hostname.toLowerCase() : "";
	if (!allowedHostnames.has(verifiedHostname)) {
		console.warn("Unexpected reCAPTCHA hostname:", responseRecaptcha.hostname);
		return NextResponse.json([{errorField: "submit", errorValue: "Invalid form hostname."}], {status: 400});
	}

	if (typeof responseRecaptcha.score !== "number" || !Number.isFinite(responseRecaptcha.score) || responseRecaptcha.score < minScore || responseRecaptcha.score > 1) {
		console.warn("Low reCAPTCHA score:", responseRecaptcha.score);
		return NextResponse.json([{errorField: "submit", errorValue: "Suspicious behavior detected. Please try again later."}], {status: 400});
	}

	const errors = [];

	if (name.length < 2 || /\d/.test(name) || name.length > 30) {
		errors.push({errorField: "name", errorValue: "Invalid Name"});
	}

	if (email.length < 4 || email.indexOf("@") < 0 || email.length > 60) {
		errors.push({errorField: "email", errorValue: "Invalid Email"});
	}

	if (contactMessage.length < 4 || contactMessage.length > 600) {
		errors.push({errorField: "message", errorValue: "Message must be between 4 and 600 characters"});
	}

	if (errors.length > 0) {
		return NextResponse.json({errors: errors, status: 422});
	}

	const message = {
		from_email: "info@moshimoshiproject.co.uk",
		subject: "From contact form",
		text: `Email from: ${name} ${"\n"}Message: ${contactMessage}${"\n"}Sender email: ${email}`,
		to: [
			{
				email: "info@moshimoshiproject.co.uk",
				type: "to",
			},
		],
	};

	try {
		const responseSendMail = await mailchimp.messages.send({
			message,
		});
		if (responseSendMail[0].status === "sent") {
			return NextResponse.json({message: "Email sent", status: 200});
		}
		throw new Error("err");
	} catch (error) {
		return NextResponse.json({errorField: "submit", errorValue: genericError, status: 400});
	}
}
