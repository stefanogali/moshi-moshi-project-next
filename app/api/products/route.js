import {NextResponse} from "next/server";

import excuteQuery from "@/helper-functions/db-connection";

export async function getProducts() {
	const productsData = [];

	const sizesAndAvailabilityData = [];

	if (productsData.length > 0) {
		productsData.forEach((specObject) => {
			const sizeAndAvailability = [];
			sizesAndAvailabilityData.forEach((sizeObject) => {
				if (specObject.id === sizeObject.shirt_id) {
					sizeAndAvailability.push(sizeObject);
				}
			});
			// JSON conversion below to avoid warning
			specObject.availability = sizeAndAvailability;
		});

		return JSON.parse(JSON.stringify(productsData));
	}
	return [];
}

export async function GET(request) {
	try {
		const result = await getProducts();
		return NextResponse.json([result]);
	} catch (error) {
		console.log("error", error);
	}
	// return NextResponse.json([{message: "Goodbye next JS"}]);
}
