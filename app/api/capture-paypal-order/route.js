import {NextResponse} from "next/server";
import * as paypal from "../paypal-api";

export async function POST(request) {
	const data = await request.json();

	try {
		const captureData = await paypal.capturePayment(data.orderID, data.cart);
		return NextResponse.json(captureData);
	} catch (err) {
		return NextResponse.json({errorfromste: err.message}, {status: 500});
	}
}
