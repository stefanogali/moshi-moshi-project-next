import {NextResponse} from "next/server";

const mailchimp = require("@mailchimp/mailchimp_transactional")(process.env.SEND_EMAIL_PRIVATE_KEY);

export async function POST(request) {
	const requestData = await request.json();
	const name = requestData.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const email = requestData.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const contactMessage = requestData.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const captchaToken = requestData.token;
	const genericError = "Ooops something went wrong. Please try to submit again, or email us at info@moshimoshiproject.co.uk";

	if (!captchaToken) {
		return NextResponse.json([{errorField: "submit", errorValue: "Ooops we are sorry but something went wrong. Please try to submit your form again."}], {status: 400});
	}

	const verifyUrl = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_PRIVATE_KEY}&response=${captchaToken}`);
	const responseRecaptcha = await verifyUrl.json();

	if (!responseRecaptcha.success) {
		return NextResponse.json([{errorField: "submit", errorValue: "Captcha challenge failed."}], {status: 400});
	}

	const errors = [];

	if (name.length < 2 || /\d/.test(name) || name.length > 30) {
		errors.push({errorField: "name", errorValue: "Invalid Name"});
	}

	if (email.length < 4 || !name.indexOf("@") || email.length > 60) {
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
