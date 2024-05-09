import React from "react";
import CheckoutProducts from "./CheckoutProducts";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {useStore} from "@/app/hook-store/store";

import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/hook-store/store");

const testProduct = {
	id: 3,
	name: "Product #1",
	price: 15,
	productImage: "notageisha1.webp",
	selectedSize: "Small",
};

const initialOptions = {
	clientId: "test",
	currency: "GBP",
	intent: "capture",
};

describe("The products to checkout", () => {
	it("renders on page", async () => {
		useStore.mockReturnValue([
			{
				products: [testProduct],
			},
		]);
		render(
			<PayPalScriptProvider options={initialOptions}>
				<CheckoutProducts />
			</PayPalScriptProvider>,
		);
		// all elements are rendered
		const subTotal = screen.getByText(/Sub-total/);
		expect(subTotal).toBeInTheDocument();

		const deliveryCost = screen.getByText(/Delivery cost/);
		expect(deliveryCost).toBeInTheDocument();

		const total = screen.getByText(/Total/);
		expect(total).toBeInTheDocument();
	});
	it("shows success text if product has been purchased through PayPal", async () => {
		// mock useState to return values for checkoutProducts, isPaypalError, isConfettiVisible, isTransactionSuccess
		jest.spyOn(React, "useState")
			.mockReturnValueOnce([[], jest.fn()]) // for checkoutProducts
			.mockReturnValueOnce([false, jest.fn()]) // for isPaypalError
			.mockReturnValueOnce([false, jest.fn()]) // for isConfettiVisible
			.mockReturnValueOnce([true, jest.fn()]); // for isTransactionSuccess

		useStore.mockReturnValue([
			{
				products: [testProduct],
			},
		]);
		render(
			<PayPalScriptProvider options={initialOptions}>
				<CheckoutProducts />
			</PayPalScriptProvider>,
		);
		// success text is rendered
		const successText = screen.getByText(/Your items will be shipped soon,/);
		expect(successText).toBeInTheDocument();
	});
	it("shows error text if any error happened during checkout on PayPal", async () => {
		// mock useState to return values for checkoutProducts, isPaypalError, isConfettiVisible, isTransactionSuccess
		jest.spyOn(React, "useState")
			.mockReturnValueOnce([[testProduct], jest.fn()]) // for checkoutProducts
			.mockReturnValueOnce([true, jest.fn()]) // for isPaypalError
			.mockReturnValueOnce([false, jest.fn()]) // for isConfettiVisible
			.mockReturnValueOnce([false, jest.fn()]); // for isTransactionSuccess

		render(
			<PayPalScriptProvider options={initialOptions}>
				<CheckoutProducts />
			</PayPalScriptProvider>,
		);

		// error text is rendered
		const errorText = await screen.findByText(/something went wrong here!/);
		expect(errorText).toBeInTheDocument();
	});
});
