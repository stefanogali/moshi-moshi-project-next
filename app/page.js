import BootstrapContainer from "./global-components/Container/BootstrapContainer";
import Card from "./global-components/Card/Card";

import variables from "./variables.module.scss";
import styles from "./page.module.scss";

import {getProducts} from "./api/products/route";

export default async function Home() {
	const products = await getProducts();

	return (
		<main
			className={styles.main}
			style={{backgroundColor: variables.primaryColor}}
		>
			<BootstrapContainer className={styles["home-products-container"]}>
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
						/>
					);
				})}
			</BootstrapContainer>
		</main>
	);
}
