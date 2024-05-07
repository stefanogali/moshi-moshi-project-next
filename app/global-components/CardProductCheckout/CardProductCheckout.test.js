import CardProductCheckout from "./CardProductCheckout";

import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Product on the checkout page", () => {
	it("renders on page", () => {
		render(<CardProductCheckout productImage={"notageisha1.webp"} productName={"Product #1"} size={"Small"} />);

		const h2 = screen.getByRole("heading", {level: 2, name: "Product #1"});
		const h4 = screen.getByRole("heading", {level: 4, name: /Size: Small/});
		expect(h2).toBeInTheDocument();
		expect(h4).toBeInTheDocument();
	});
});
