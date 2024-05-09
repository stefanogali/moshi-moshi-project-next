import Cart from "./Cart";
import {useStore} from "@/app/hook-store/store";

import {fireEvent, render, screen, act, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/hook-store/store");

const testProduct = {
	id: 3,
	name: "Product #1",
	price: 15,
	productImage: "notageisha1.webp",
	selectedSize: "Small",
};

describe("Cart", () => {
	it("renders on page", () => {
		useStore.mockReturnValue([
			{
				products: [],
			},
		]);
		render(<Cart />);

		const cartIconContainer = screen.getByTestId("cart-icon-container");
		expect(cartIconContainer).toBeInTheDocument();
	});
	it("it shows empty tooltip if clicking cart with no products", async () => {
		render(<Cart />);

		const cartIconContainer = screen.getByTestId("cart-icon-container");
		await act(async () => {
			fireEvent.click(cartIconContainer);
		});

		await waitFor(() => {
			const tooltip = screen.getByText(/Your cart is empty/);
			expect(tooltip).toBeInTheDocument();
			expect(tooltip).toBeVisible();
		});
	});
	it("it shows product in tooltip if clicking cart with  product", async () => {
		useStore.mockReturnValue([
			{
				products: [testProduct],
			},
		]);
		render(<Cart />);

		const cartIconContainer = screen.getByTestId("cart-icon-container");
		await act(async () => {
			fireEvent.click(cartIconContainer);
		});
		await waitFor(() => {
			const productName = screen.getByText(/Product #1/);
			const deleteIcon = screen.getByAltText("Delete icon");
			expect(productName).toBeInTheDocument();
			expect(productName).toBeVisible();
			expect(deleteIcon).toBeVisible();
		});
	});
	it("it removes product in tooltip if clicking remove icon", async () => {
		const mockDispatch = jest.fn();

		useStore.mockReturnValue([
			{
				products: [testProduct],
			},
			mockDispatch,
		]);
		render(<Cart />);

		const cartIconContainer = screen.getByTestId("cart-icon-container");
		await act(async () => {
			fireEvent.click(cartIconContainer);
		});

		const deleteIcon = screen.getByAltText("Delete icon");
		await act(async () => {
			fireEvent.click(deleteIcon);
		});

		expect(mockDispatch).toHaveBeenCalledWith("REMOVE_PRODUCT", {
			id: 3,
		});
	});
});
