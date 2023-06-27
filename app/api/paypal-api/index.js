const {CLIENT_ID, APP_SECRET} = process.env;
import excuteQuery from "@/helper-functions/db-connection";

const base = "https://api-m.sandbox.paypal.com";
let accessToken = null;

export async function createOrder(data) {
	accessToken = accessToken || (await generateAccessToken());
	const url = `${base}/v2/checkout/orders`;
	let itemsFromCart = [];
	let totalPrice = 0;

	// console.log("datastef", data);
	for (let i = 0; i < data.cart.length; i++) {
		const getProductDetails = await excuteQuery({
			query: `SELECT DISTINCT moshimos_products.Shirt.name,
			moshimos_products.Product.price
			FROM moshimos_products.Shirt, moshimos_products.Product
			WHERE moshimos_products.Shirt.id = ${data.cart[i].id}`,
			values: "",
		});
		// console.log("data[i].id", data[i].id);
		const extractObj = getProductDetails[0];
		// console.log("getProductDetails", getProductDetails);
		itemsFromCart.push({
			name: extractObj.name + " Size: " + data.cart[i].description,
			description: data.cart[i].description,
			unit_amount: {
				currency_code: "GBP",
				value: extractObj.price,
			},
			quantity: "1",
		});

		totalPrice += extractObj.price;
	}
	// console.log("itemsFromCart", itemsFromCart);
	// console.log("totalPrice", totalPrice);

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
	console.log("entered capturePayment");
	accessToken = accessToken || (await generateAccessToken());
	const url = `${base}/v2/checkout/orders/${orderId}/capture`;
	const response = await fetch(url, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	console.log("cart", cart);

	// DB updates here
	if (response.status === 200 || response.status === 201) {
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

			console.log("decreaseAvailability", decreaseAvailability.message);
		}
		// need to set real data below
	}

	return handleResponse(response);
}

export async function generateAccessToken() {
	if (accessToken) {
		return accessToken;
	}
	const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
	const response = await fetch(`${base}/v1/oauth2/token`, {
		method: "post",
		body: "grant_type=client_credentials",
		headers: {
			Authorization: `Basic ${auth}`,
		},
	});

	const jsonData = await handleResponse(response);
	accessToken = jsonData.access_token; // Store access token in the variable
	return accessToken;
}

async function handleResponse(response) {
	if (response.status === 200 || response.status === 201) {
		return response.json();
	}
	//need to fix error outputted to screen

	const errorMessage = await response.text();
	throw new Error(errorMessage);
}
