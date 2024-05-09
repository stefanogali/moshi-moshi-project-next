import Header from "./Header";

import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock useRouter:
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			prefetch: () => null,
		};
	},
	usePathname() {
		return "";
	},
}));

describe("Header", () => {
	it("renders on page", () => {
		render(<Header />);

		// Check if logo and title are rendered
		const logo = screen.getByRole("img", {name: "Moshi Moshi Project Logo"});
		const headerTitle = screen.getByRole("heading", {name: "Moshi Moshi Project"});
		expect(headerTitle).toBeInTheDocument();
		expect(logo).toBeInTheDocument();
	});
});
