import Script from "next/script";
import CheckoutProducts from "../global-components/CheckoutProducts/CheckoutProducts";

export const metadata = {
	title: "Checkout | Moshi Moshi Project",
	description: "Checkout page to get your cute Japanese Design T-shirt. Transactions are secure and fully processed through paypal.",
};

const isDev = process.env.NODE_ENV === "development";

export default function Checkkout() {
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
				</>
			) : null}
			<CheckoutProducts />
		</main>
	);
}
