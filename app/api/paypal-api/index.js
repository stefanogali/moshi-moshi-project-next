const {CLIENT_ID, APP_SECRET} = process.env;
import {sql} from "@vercel/postgres";

let base = "";
if (process.env.NODE_ENV === "development") {
	base = "https://api-m.sandbox.paypal.com";
} else {
	base = "https://api-m.paypal.com";
}

export async function createOrder(data) {
	const accessToken = await generateAccessToken();
	const url = `${base}/v2/checkout/orders`;
	let itemsFromCart = [];
	let totalPrice = 0;

	for (let i = 0; i < data.cart.length; i++) {
		const getProductDetails = await sql`SELECT DISTINCT "Shirt".name,
		"Product".price
		FROM "Shirt"
		JOIN "Product" ON "Shirt".id = "Product".shirt_id
		WHERE "Shirt".id = ${data.cart[i].id}`;

		const {rows} = getProductDetails;
		const extractObj = rows[0];

		itemsFromCart.push({
			name: extractObj.name + " - Size: " + data.cart[i].description,
			description: data.cart[i].description,
			unit_amount: {
				currency_code: "GBP",
				value: extractObj.price,
			},
			quantity: "1",
		});

		totalPrice += extractObj.price;
	}

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			intent: "CAPTURE",
			purchase_units: [
				{
					amount: {
						currency_code: "GBP",
						value: totalPrice,
						breakdown: {
							item_total: {
								currency_code: "GBP",
								value: totalPrice,
							},
						},
					},
					items: itemsFromCart,
				},
			],
		}),
	});

	return handleResponse(response);
}

export async function capturePayment(orderId, cart) {
	//check if products are available. If not, return with 500 error
	for (let i = 0; i < cart.length; i++) {
		const decreaseAvailability = await sql`UPDATE "Product"
		SET availability = "Product".availability - 1
		FROM "Size", "Shirt"
		WHERE "Product".shirt_id = ${cart[i].id}
		AND "Product".size_id = "Size".id
		AND "Size".size = ${cart[i].description}
		AND "Shirt".name = ${cart[i].name}
		AND "Product".active = TRUE
		AND "Product".availability > 0`;

		if (decreaseAvailability.rowCount === 0) {
			return handleResponse({status: 500, message: "One or more products not available."});
		}

		const setInactive = await sql`UPDATE "Product"
		SET "active" = FALSE
		WHERE "Product".shirt_id IN (
			SELECT "Product".shirt_id
			FROM (
				SELECT "Product".shirt_id
				FROM "Product"
				WHERE "Product".shirt_id = ${cart[i].id} AND "Product".availability < 1
			) AS temporaryTable
			GROUP BY "Product".shirt_id
			HAVING COUNT(*) = 3
		) 
		AND "Product".shirt_id = ${cart[i].id};
		`;
	}

	const accessToken = await generateAccessToken();
	const url = `${base}/v2/checkout/orders/${orderId}/capture`;
	const response = await fetch(url, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return handleResponse(response);
}

export async function generateAccessToken() {
	const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
	const response = await fetch(`${base}/v1/oauth2/token`, {
		method: "POST",
		body: "grant_type=client_credentials",
		headers: {
			Authorization: `Basic ${auth}`,
			"Cache-Control": "no-store",
			Pragma: "no-cache",
			Expires: "0",
		},
	});

	const jsonData = await handleResponse(response);
	return jsonData.access_token;
}

async function handleResponse(response) {
	if (response.status === 200 || response.status === 201) {
		return response.json();
	}

	const errorMessage = await response;
	throw Error(errorMessage);
}
