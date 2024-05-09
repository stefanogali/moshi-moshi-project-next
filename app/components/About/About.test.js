import About from "./About";

import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";

describe("About", () => {
	it("renders on page", () => {
		render(<About />);

		const image = screen.getAllByAltText(/face/i);
		expect(image.length).toBe(2);
	});
});
