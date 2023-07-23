"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cart from "../Cart/Cart";
import Card from "../Card/Card";

export default function ProductsContainer({className, rowClassName, products}) {
	const router = useRouter();
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

	// console.log("products", products);

	useEffect(() => {
		router.refresh();
	}, []);

	return (
		<div id="products">
			<Container className={className}>
				<Row>
					<Col lg={products.length > 0 ? 9 : 12}>
						<Row className={rowClassName}>
							{products.length > 0 ? (
								products.map((product, index) => {
									return (
										<Card
											key={product.id}
											id={product.id}
											index={index}
											name={product.name}
											productImage={`${product.name.toLowerCase().replace(/\s+/g, "").replace(/#/g, "")}.jpg`}
											productShowImage={`${product.name.toLowerCase().replace(/\s+/g, "").replace(/#/g, "")}-show.jpg`}
											availability={product.availability}
											description={product.description}
											material={product.material}
											shortDescription={product.short_description}
											price={product.price}
											isActive={product.active}
										/>
									);
								})
							) : (
								<>
									<h2 className="text-center">Oooops looks like there is a technical problem here! Please wait while we fixing it!</h2>
								</>
							)}
						</Row>
					</Col>
					{products.length > 0 && (
						<Col lg={3}>
							<Cart />
						</Col>
					)}
				</Row>
			</Container>
		</div>
	);
}
