import {NextResponse} from "next/server";
import * as paypal from "../paypal-api";

export async function POST(request) {
	const data = await request.json();

	try {
		const captureData = await paypal.capturePayment(data.orderID, data.cart);
		return NextResponse.json({message: "Transation executed successfully", status: 200}, {status: 200});
	} catch (err) {
		console.log("error", err);
		return NextResponse.json({error: "Internal Server Error"}, {status: 500});
	}
}
