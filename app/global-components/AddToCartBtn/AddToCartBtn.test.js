import AddToCartBtn from "./AddToCartBtn";
import {useStore} from "@/app/hook-store/store";

import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";

jest.mock("@/hook-store/store", () => ({
	useStore: jest.fn().mockReturnValue([{}, jest.fn()]),
}));

describe("Add to cart button", () => {
	it("renders on page", () => {
		render(<AddToCartBtn isActive productImage id selectedSize price name />);

		// check if component is rendered
		const button = screen.getByRole("button", {name: /Add to cart/});
		expect(button).toBeInTheDocument();
	});
	it("dispatches action on click", () => {
		const mockDispatch = jest.fn();

		useStore.mockReturnValue([{}, mockDispatch]);

		render(<AddToCartBtn isActive={true} productImage="testImage.jpg" id={1} selectedSize="Small" price={15} name="Test Product" />);

		const button = screen.getByRole("button", {name: /Add to cart/});

		fireEvent.click(button);

		expect(mockDispatch).toHaveBeenCalledWith("ADD_PRODUCTS", {
			productImage: "testImage.jpg",
			id: 1,
			selectedSize: "Small",
			price: 15,
			name: "Test Product",
		});
	});
	it("do not render on page if not active", () => {
		render(<AddToCartBtn isActive={false} productImage id selectedSize price name />);

		// check button is not on the screen if isActive is false
		const button = screen.queryByRole("button", {name: /Add to cart/});
		expect(button).not.toBeInTheDocument();
	});
});
