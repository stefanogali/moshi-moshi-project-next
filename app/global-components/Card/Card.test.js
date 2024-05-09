import Card from "./Card";

import {fireEvent, render, screen, within, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";

const availability = [
	{
		size: "Medium",
		shirt_id: 1,
		availability: 1,
	},
	{
		size: "Large",
		shirt_id: 1,
		availability: 1,
	},
];

describe("Product card", () => {
	it("renders on page", () => {
		render(<Card id name="Product Name" productImage productShowImage index={1} description availability={availability} material shortDescription price isActive />);

		// check if all components are rendered
		const h4 = screen.getByRole("heading", {level: 4, name: /Product Name/});
		const select = screen.getByRole("combobox");
		expect(h4).toBeInTheDocument();
		expect(select).toHaveValue("Medium"); //refers to the first availability item ib the array of objects
	});
	it("display out of stock if is not active", () => {
		render(<Card id name="Product Name" productImage productShowImage index description availability={availability} material shortDescription price isActive={false} />);

		// check if out of stock message is displayed
		const button = screen.queryByRole("button", {name: /Add to cart/});
		const outOfStockMessage = screen.getByText(/Temporarily out stock...back soon/);
		expect(outOfStockMessage).toBeInTheDocument();
		expect(button).not.toBeInTheDocument();
	});
	it("modal is on screen when clicked on image", () => {
		render(<Card id name="Product Name" productImage="sadgirl1.webp" productShowImage index={1} description availability={availability} material={"Some material"} shortDescription price isActive />);

		// check if modal on the screen after clicking on image
		const image = screen.getByAltText("Image of product Product Name");
		fireEvent.click(image);

		const modal = screen.getByRole("dialog");
		expect(modal).toBeInTheDocument();
	});
	it("modal is closed when clicking Close button", async () => {
		render(<Card id name="Product Name" productImage="sadgirl1.webp" productShowImage index={1} description availability={availability} material={"Some material"} shortDescription price isActive />);

		const image = screen.getByAltText("Image of product Product Name");
		fireEvent.click(image);
		const modal = screen.queryByRole("dialog");
		const closeButton = within(modal).getByText("Close");
		fireEvent.click(closeButton);

		// has to wait for the modal to be removed from the DOM after ckicking the close button
		await waitFor(() => {
			const modalAfterClose = screen.queryByRole("dialog");
			expect(modalAfterClose).not.toBeInTheDocument();
		});
	});
});
