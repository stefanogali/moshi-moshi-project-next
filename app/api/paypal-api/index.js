const {CLIENT_ID, APP_SECRET} = process.env;
import excuteQuery from "@/helper-functions/db-connection";

let base = "";
if (process.env.NODE_ENV || process.env.NODE_ENV === "development") {
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
		const getProductDetails = await excuteQuery({
			query: `SELECT DISTINCT moshimos_products.Shirt.name,
			moshimos_products.Product.price
			FROM moshimos_products.Shirt, moshimos_products.Product
			WHERE moshimos_products.Shirt.id = ${data.cart[i].id}`,
			values: "",
		});

		const extractObj = getProductDetails[0];

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
		const decreaseAvailability = await excuteQuery({
			query: `UPDATE moshimos_products.Product, moshimos_products.Size,
		moshimos_products.Shirt
		SET moshimos_products.Product.availability = moshimos_products.Product.availability - 1
		WHERE moshimos_products.Product.shirt_id = ${cart[i].id}
		AND moshimos_products.Product.size_id = moshimos_products.Size.id
		AND moshimos_products.Size.size = '${cart[i].description}'
		AND moshimos_products.Shirt.name = '${cart[i].name}'
		AND moshimos_products.Product.active = 1
		AND moshimos_products.Product.availability > 0;`,
			values: "",
		});

		if (decreaseAvailability.affectedRows === 0) {
			return handleResponse({status: 500, message: "One or more products not available."});
		}

		const setInactive = await excuteQuery({
			query: `UPDATE moshimos_products.Product
			SET moshimos_products.Product.active = 0
			WHERE moshimos_products.Product.shirt_id in(
			SELECT moshimos_products.Product.shirt_id FROM (SELECT moshimos_products.Product.shirt_id
			FROM moshimos_products.Product
			WHERE moshimos_products.Product.shirt_id = ${cart[i].id} AND moshimos_products.Product.availability < 1) as temporaryTable
			HAVING COUNT(moshimos_products.Product.availability < 1) = 3) 
			AND moshimos_products.Product.shirt_id = ${cart[i].id}`,
			values: "",
		});
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
