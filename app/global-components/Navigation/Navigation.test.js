import Navigation from "./Navigation";

import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import * as ScrollToModule from "../../../helper-functions/scrollTo";

jest.mock("../../../helper-functions/scrollTo");

// Mock useRouter:
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			prefetch: () => null,
			push: jest.fn(),
		};
	},
	usePathname() {
		return "/";
	},
}));

describe("Navigation", () => {
	it("renders on page", () => {
		render(<Navigation />);

		const list = screen.getByRole("list");
		const listItems = screen.getAllByRole("listitem");

		expect(list).toBeInTheDocument();
		expect(listItems.length).toBe(3);
	});
	it("scrolls to the section of the page when item is clicked", () => {
		const scrollToMock = jest.fn();
		ScrollToModule.scrollTo = scrollToMock;
		render(<Navigation />);

		const linkText = screen.getByText("Products");

		fireEvent.click(linkText);

		expect(jest.requireMock("../../../helper-functions/scrollTo").scrollTo).toHaveBeenCalledWith({
			id: "products",
			ref: undefined,
			duration: 500,
		});
	});
});
