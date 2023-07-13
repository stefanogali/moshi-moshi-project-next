import {NextResponse} from "next/server";
// const mailchimp = require("mailchimp_transactional")(process.env.SEND_EMAIL_PRIVATE_KEY);

const mailchimpFactory = require("@mailchimp/mailchimp_transactional/src/index.js");
const mailchimp = mailchimpFactory(process.env.SEND_EMAIL_PRIVATE_KEY);

export async function POST(request) {
	// return NextResponse.json({message: "Email sent"}, {status: 200});
	const requestData = await request.json();
	const name = requestData.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const email = requestData.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const contactMessage = requestData.message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const captchaToken = requestData.token;

	if (!captchaToken) {
		// return res.status(400).json([{errorField: 'submit', errorValue: 'Ooops we are sorry but something went wrong. Please try to submit your form again.'}]);
		return NextResponse.json([{errorField: "submit", errorValue: "Ooops we are sorry but something went wrong. Please try to submit your form again."}], {status: 400});
	}

	const verifyUrl = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_PRIVATE_KEY}&response=${captchaToken}`);
	const responseRecaptcha = await verifyUrl.json();

	if (!responseRecaptcha.success) {
		// console.log("failed captcha", responseRecaptcha);
		// return res.status(400).json([{errorField: 'submit', errorValue: 'Captcha challenge failed.'}]);
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
		// return res.status(422).json(errors);
		return NextResponse.json(errors, {status: 422});
	}

	const message = {
		from_email: "info@moshimoshiproject.co.uk",
		subject: "From contact form",
		text: "Welcome to Mailchimp Transactional!",
		to: [
			{
				email: "info@moshimoshiproject.co.uk",
				type: "to",
			},
		],
	};
	// return NextResponse.json({message: "Email sent"}, {status: 200});
	// return NextResponse.json([{errorField: "submit", errorValue: "Ooops we are sorry but something went wrong. Please try to submit your form again."}], {status: 400});
	// const responseSendMail = mailchimp.messages
	// 	.send({
	// 		message,
	// 	})
	// 	.then(() => {
	// 		// console.log(result);
	// 		// console.log("hellloooooo", result.body);
	// 		return NextResponse.json({message: "Email sent"}, {status: 200});
	// 	})
	// 	.catch((err) => {
	// 		console.log("Error", err);
	// 		// return res.status(400).json([{errorField: 'submit', errorValue: 'Ooops we are sorry ' + name + ' but something went wrong. Please try to submit your form again.'}]);
	// 		return NextResponse.json([{errorField: "submit", errorValue: "Ooops we are sorry " + name + " but something went wrong. Please try to submit your form again."}, {status: 400}]);
	// 	});

	try {
		const responseSendMail = await mailchimp.messages.send({
			message,
		});
		console.log("responseSendMail", responseSendMail);
		return NextResponse.json({message: "Email sent"}, {status: 200});
	} catch (error) {
		return NextResponse.json([{errorField: "submit", errorValue: "Ooops we are sorry " + name + " but something went wrong. Please try to submit your form again."}, {status: 400}]);
	}
}
