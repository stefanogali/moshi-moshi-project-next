import {NextResponse} from "next/server";

import excuteQuery from "@/helper-functions/db-connection";

export async function getProducts() {
	const result = await excuteQuery({
		query: `SELECT DISTINCT moshimos_products.Shirt.id, moshimos_products.Shirt.name, moshimos_products.Description.description,
		moshimos_products.Material.material, moshimos_products.Short_description.short_description,
		moshimos_products.Product.price, moshimos_products.Product.active
		FROM moshimos_products.Shirt, moshimos_products.Product, moshimos_products.Description,
		moshimos_products.Material, moshimos_products.Short_description
		WHERE moshimos_products.Product.shirt_id = moshimos_products.Shirt.id
		AND moshimos_products.Product.description_id = moshimos_products.Description.id
		AND moshimos_products.Product.material_id = moshimos_products.Material.id
		AND moshimos_products.Product.short_description_id = moshimos_products.Short_description.id`,
		values: ''
	});
	return result;
}

export async function GET(request) {
	try {
		const result = await getProducts();
		return NextResponse.json([result]);
	} catch (error) {
		console.log('error', error);
	}
	// return NextResponse.json([{message: "Goodbye next JS"}]);
}
