"use client";

import Col from "react-bootstrap/Col";

export default function Card({
	name,
	productImage,
	index,
	description,
	material,
	shortDescription,
	proce,
	isActive,
}) {
	// frontend fetch
	// const getData = async () => {
	// 	const res = await fetch("http://localhost:3000/api/products", {
	// 		method: "GET",
	// 	});

	// 	const data = await res.json();
	// 	console.log("data", data);
	// 	return await data;
	// };

	// getData();
	// console.log("products in bootstrap container", products);

	return <Col lg={4}>Hello mate{index}</Col>;
}
