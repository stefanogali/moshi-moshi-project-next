import {NextResponse} from "next/server";

import excuteQuery from "@/helper-functions/db-connection";

export async function getProducts() {
	const productsData = await excuteQuery({
		query: `SELECT DISTINCT moshimos_products.Shirt.id, moshimos_products.Shirt.name, moshimos_products.Description.description,
		moshimos_products.Material.material, moshimos_products.Short_description.short_description,
		moshimos_products.Product.price, moshimos_products.Product.active
		FROM moshimos_products.Shirt, moshimos_products.Product, moshimos_products.Description,
		moshimos_products.Material, moshimos_products.Short_description
		WHERE moshimos_products.Product.shirt_id = moshimos_products.Shirt.id
		AND moshimos_products.Product.description_id = moshimos_products.Description.id
		AND moshimos_products.Product.material_id = moshimos_products.Material.id
		AND moshimos_products.Product.short_description_id = moshimos_products.Short_description.id`,
		values: "",
	});

	const sizesAndAvailabilityData = await excuteQuery({
		query: `SELECT  DISTINCT moshimos_products.Size.size, moshimos_products.Product.shirt_id, moshimos_products.Product.availability
		FROM moshimos_products.Size, moshimos_products.Product, moshimos_products.Shirt
		WHERE moshimos_products.Product.size_id = moshimos_products.Size.id;`,
		values: "",
	});

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
}
