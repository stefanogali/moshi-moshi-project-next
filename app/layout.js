import {PT_Sans} from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";

// import {CartContextProvider} from "./store/cart-context";
import Header from "./global-components/Header/Header";
import Footer from "./global-components/Footer/Footer";

const ptSans = PT_Sans({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export default function RootLayout({children}) {
	return (
		<html lang="en">
			<body className={ptSans.className}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
