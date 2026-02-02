import {PT_Sans} from "next/font/google";
import "./globals.css";
import "@/styles/bootstrap.scss";

// import {CartContextProvider} from "./store/cart-context";
import Header from "./global-components/Header/Header";
import Footer from "./global-components/Footer/Footer";

const ptSans = PT_Sans({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--font-pt-sans",
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
