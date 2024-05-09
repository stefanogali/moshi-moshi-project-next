import ProductsContainer from "./ProductsContainer";

import {useStore} from "@/app/hook-store/store";

import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/hook-store/store");

// mock intersection observer
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}

	observe() {
		return null;
	}

	disconnect() {
		return null;
	}

	unobserve() {
		return null;
	}
};

// mock products
const products = [
	{
		id: 1,
		name: "Sad Girl #1",
		description: "Women' s rolled sleeve tunic t-shirt.",
		material: "100% Combed Cotton Fine Jersey 115g.",
		short_description: " Original japanese t-shirt design.",
		price: 15,
		active: 1,
		availability: [
			{size: "Small", shirt_id: 1, availability: 1},
			{size: "Medium", shirt_id: 1, availability: 1},
			{size: "Large", shirt_id: 1, availability: 1},
		],
	},
	{
		id: 2,
		name: "Sunglasses #1",
		description: "Women' s rolled sleeve tunic t-shirt.",
		material: "100% Combed Cotton Fine Jersey 115g.",
		short_description: "Japanese design T-shirt made in London.",
		price: 15,
		active: 1,
		availability: [
			{size: "Small", shirt_id: 2, availability: 1},
			{size: "Medium", shirt_id: 2, availability: 1},
			{size: "Large", shirt_id: 2, availability: 0},
		],
	},
];

describe("Products Container", () => {
	it("renders on page", () => {
		useStore.mockReturnValue([
			{
				products: products,
			},
		]);
		render(<ProductsContainer products={products} />);

		// there should be same number of h4 elements as products
		const h4 = screen.getAllByTestId("product-title");
		expect(h4.length).toBe(products.length);
	});
});
