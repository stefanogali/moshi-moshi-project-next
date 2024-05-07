import Footer from "./Footer";

import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Footer", () => {
	it("renders on page", () => {
		render(<Footer />);
		const footer = screen.getByTestId("footer");
		expect(footer).toBeInTheDocument();
	});
});
