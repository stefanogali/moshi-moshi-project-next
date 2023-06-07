import ProductsContainer from "./global-components/Products-container/ProductsContainer";
import About from "./components/About/About";
import ContactForm from "./components/Contact-form/ContactForm";

import productsContainerStyles from "./global-components/Products-container/ProductsContainer.module.scss";

import {getProducts} from "./api/products/route";

export default async function Home() {
	const products = await getProducts();

	return (
		<main>
			<div className={productsContainerStyles["products-main"]}>
				<ProductsContainer
					className={
						productsContainerStyles["home-products-container"]
					}
					rowClassName={productsContainerStyles["products-row"]}
					products={products}
				></ProductsContainer>
			</div>
			<About />
			<ContactForm />
		</main>
	);
}
