import Script from "next/script";

import {revalidatePath} from "next/cache";

import ProductsContainer from "./global-components/Products-container/ProductsContainer";
import About from "./components/About/About";
import ContactForm from "./components/Contact-form/ContactForm";

import productsContainerStyles from "./global-components/Products-container/ProductsContainer.module.scss";

import {getProducts} from "./api/products/route";

export const metadata = {
	title: "Japanese design T-Shirts | Moshi Moshi Project",
	description: "Get your cute Japanese T-Shirt with our original designs. For girls and women fashion.",
};

const isDev = process.env.NODE_ENV === "development";

export default async function Home() {
	revalidatePath("/");
	const products = await getProducts();

	return (
		<main>
			{!isDev ? (
				<>
					<Script async src="https://www.googletagmanager.com/gtag/js?id=G-TTDL5P5062"></Script>
					<Script id="google-analytics">
						{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TTDL5P5062');
`}
					</Script>{" "}
				</>
			) : null}
			<div className={productsContainerStyles["products-main"]}>
				<ProductsContainer className={productsContainerStyles["home-products-container"]} rowClassName={productsContainerStyles["products-row"]} products={products}></ProductsContainer>
			</div>
			<About />
			<ContactForm />
		</main>
	);
}
