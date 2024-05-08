import {scrollTo} from "./scrollTo";

describe("scrollTo", () => {
	it("scrolls to the element", () => {
		const element = document.createElement("div");
		element.setAttribute("id", "test");
		document.body.appendChild(element);

		scrollTo({id: "test"});

		expect(window.scrollY).toBe(0);
	});

	it("logs an error for an invalid element", () => {
		console.error = jest.fn();

		scrollTo({id: "invalid"});

		expect(console.error).toHaveBeenCalled();
	});
});
