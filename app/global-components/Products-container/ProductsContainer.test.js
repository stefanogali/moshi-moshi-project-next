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
	{
		id: 3,
		name: "Not a Geisha #1",
		description: "Women' s rolled sleeve tunic t-shirt.",
		material: "100% Combed Cotton Fine Jersey 115g.",
		short_description: "High quality japanese inspired t-shirt.",
		price: 15,
		active: 1,
		availability: [
			{size: "Small", shirt_id: 3, availability: 1},
			{size: "Medium", shirt_id: 3, availability: 0},
			{size: "Large", shirt_id: 3, availability: 2},
		],
	},
	{
		id: 4,
		name: "Sad Girl #2",
		description: "Women's taped neck and shoulders t-shirt.",
		material: "100% Pre-shrunk Cotton 172g.",
		short_description: "Your online quaility T-Shirt.",
		price: 15,
		active: 1,
		availability: [
			{size: "Small", shirt_id: 4, availability: 1},
			{size: "Medium", shirt_id: 4, availability: 0},
			{size: "Large", shirt_id: 4, availability: 3},
		],
	},
	{
		id: 5,
		name: "Sunglasses #2",
		description: "Scoop neck woman's organic t-shirt.",
		material: "100% Organic Ring-spun Cotton 120g.",
		short_description: "Get this Moshi Moshi Project T-Shirt.",
		price: 15,
		active: 1,
		availability: [
			{size: "Small", shirt_id: 5, availability: 2},
			{size: "Medium", shirt_id: 5, availability: 0},
			{size: "Large", shirt_id: 5, availability: 3},
		],
	},
	{
		id: 6,
		name: "Not a Geisha #2",
		description: "Scoop neck woman's organic t-shirt.",
		material: "100% Organic Ring-spun Cotton 120g.",
		short_description: "Vintage T-Shirt Design.",
		price: 15,
		active: 0,
		availability: [
			{size: "Small", shirt_id: 6, availability: 0},
			{size: "Medium", shirt_id: 6, availability: 0},
			{size: "Large", shirt_id: 6, availability: 0},
		],
	},
	{
		id: 7,
		name: "Sad Girl #3",
		description: "Unisex t-shirt.",
		material: "Soft Pre-shrunk 100% Cotton Ring Spun T.",
		short_description: "Japanese manga inspired design.",
		price: 15,
		active: 1,
		availability: [
			{size: "Medium", shirt_id: 7, availability: 0},
			{size: "Large", shirt_id: 7, availability: 2},
			{size: "XL", shirt_id: 7, availability: 5},
		],
	},
	{
		id: 8,
		name: "Sunglasses #3",
		description: "Unisex t-shirt.",
		material: "Soft Pre-shrunk 100% Cotton Ring Spun T.",
		short_description: "Punk rock T-Shirt.",
		price: 15,
		active: 0,
		availability: [
			{size: "Medium", shirt_id: 8, availability: 0},
			{size: "Large", shirt_id: 8, availability: 0},
			{size: "XL", shirt_id: 8, availability: 0},
		],
	},
	{
		id: 9,
		name: "Not a Geisha #3",
		description: "Unisex t-shirt.",
		material: "Soft Pre-shrunk 100% Cotton Ring Spun T.",
		short_description: "Your online favourite Tee.",
		price: 15,
		active: 1,
		availability: [
			{size: "Medium", shirt_id: 9, availability: 0},
			{size: "Large", shirt_id: 9, availability: 1},
			{size: "XL", shirt_id: 9, availability: 1},
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

		const h4 = screen.getAllByTestId("product-title");

		expect(h4.length).toBe(products.length);
	});
});
