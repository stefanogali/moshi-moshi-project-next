"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cart from "../Cart/Cart";

export default function ProductsContainer({children, className, rowClassName}) {
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

	return (
		<Container className={className}>
			<Row>
				<Col lg={9}>
					<Row className={rowClassName}>{children}</Row>
				</Col>
				<Col lg={3}>
					<Cart />
				</Col>
			</Row>
		</Container>
	);
}
