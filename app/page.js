import Script from "next/script";

import {revalidatePath} from "next/cache";

import ProductsContainer from "./global-components/Products-container/ProductsContainer";
import About from "./components/About/About";
import ContactForm from "./components/Contact-form/ContactForm";

import productsContainerStyles from "./global-components/Products-container/ProductsContainer.module.scss";

import {getProducts} from "./api/products/route";

export const metadata = {
	title: "Japanese design T-Shirts | Moshi Moshi Project",
	description: "Discover the Moshi Moshi Project – your go-to shop for cute, Japanese-inspired t-shirts! Adorable, playful designs that bring a touch of kawaii to your wardrobe. Shop now for unique, fun fashion that stands out!",
	generator: "Next.js",
	applicationName: "Moshi Moshi Project",
	keywords: ["Japanese-inspired t-shirts", "Cute graphic tees", "Fun t-shirts for adults", "Cute casual wear", "Pastel t-shirts"],
	authors: [{name: "Stefano Galiffa", url: "https://www.paninopanini.co.uk/"}],
	metadataBase: new URL("https://www.moshimoshiproject.co.uk"),
	openGraph: {
		images: "/product-images/notageisha2.webp",
	},
};

const isDev = process.env.NODE_ENV === "development";

export default async function Home() {
	revalidatePath("/");
	const products = await getProducts();

	const productSchemaArray = products.map((product) => ({
		"@context": "https://schema.org/",
		"@type": "Product",
		name: product.name,
		image: `/product-images${product.name.toLowerCase().replace(/\s+/g, "").replace(/#/g, "")}.webp`,
		description: product.description,
		offers: {
			"@type": "Offer",
			priceCurrency: "GBP",
			price: product.price,
			availability: "https://schema.org/" + product.active,
			url: "https://www.moshimoshiproject.co.uk/",
		},
	}));

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
					</Script>
					<Script type="application/ld+json" id="product-schema" dangerouslySetInnerHTML={{__html: JSON.stringify(productSchemaArray)}}></Script>
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
