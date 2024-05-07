import CheckoutSummary from "./CheckoutSummary";

import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("The checkout summary", () => {
	it("renders on page", async () => {
		render(<CheckoutSummary totalAmount={30} />);
		const totalPrice = screen.getByText(/Total/);
		expect(totalPrice).toBeInTheDocument();

		const totalPriceAmount = screen.getAllByText(/30/);
		expect(totalPriceAmount[1]).toBeInTheDocument();
	});
});
