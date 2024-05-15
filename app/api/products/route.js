import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function getProducts() {
	const productsData = await sql`SELECT DISTINCT "Shirt".id, "Shirt".name, "Description".description,
    "Material".material, "Short_description".short_description,
    "Product".price, "Product".active
    FROM "Shirt", "Product", "Description",
    "Material", "Short_description"
    WHERE "Product".shirt_id = "Shirt".id
    AND "Product".description_id = "Description".id
    AND "Product".material_id = "Material".id
    AND "Product".short_description_id = "Short_description".id`;

	const sizesAndAvailabilityData = await sql`SELECT  DISTINCT "Size".size, "Product".shirt_id, "Product".availability
		FROM "Size", "Product", "Shirt"
		WHERE "Product".size_id = "Size".id;`;

	const productDataRows = productsData.rows;
	const sizesAndAvailabilityDataRows = sizesAndAvailabilityData.rows;

	if (productDataRows.length > 0) {
		productDataRows.forEach((specObject) => {
			const sizeAndAvailability = [];
			sizesAndAvailabilityDataRows.forEach((sizeObject) => {
				if (specObject.id === sizeObject.shirt_id) {
					sizeAndAvailability.push(sizeObject);
				}
			});
			// JSON conversion below to avoid warning
			specObject.availability = sizeAndAvailability;
		});

		return JSON.parse(JSON.stringify(productDataRows));
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
