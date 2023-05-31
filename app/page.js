import ProductsContainer from "./global-components/Products-container/ProductsContainer";
import Card from "./global-components/Card/Card";
import About from "./components/About/About";
import ContactForm from "./components/Contact-form/ContactForm";

import variables from "./variables.module.scss";

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
				>
					{products.map((product, index) => {
						return (
							<Card
								key={product.id}
								index={index}
								name={product.name}
								productImage={`${product.name
									.toLowerCase()
									.replace(/\s+/g, "")
									.replace(/#/g, "")}.jpg`}
								description={product.description}
								material={product.material}
								shortDescription={product.short_description}
								price={product.price}
								isActive={product.active}
								variablesCss={variables}
							/>
						);
					})}
				</ProductsContainer>
			</div>
			<About />
			<ContactForm />
		</main>
	);
}
