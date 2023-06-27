import {NextResponse} from "next/server";
import * as paypal from "../paypal-api";

export async function POST(request) {
	const data = await request.json();
	// console.log("data", data);
	try {
		const order = await paypal.createOrder(data);
		return NextResponse.json(order);
	} catch (err) {
		NextResponse.json({error: err.message});
	}
}
