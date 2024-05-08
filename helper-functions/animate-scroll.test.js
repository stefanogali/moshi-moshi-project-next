import {animateScroll} from "./animate-scroll";

describe("animateScroll", () => {
	beforeEach(() => {
		window.scrollTo = jest.fn();

		let frame = 0;
		window.requestAnimationFrame = jest.fn((callback) => {
			frame++;
			return callback((frame * 1000) / 60); // Simulate 60 FPS
		});
	});

	it("scrolls to the target position", () => {
		const targetPosition = 100;
		const initialPosition = 0;
		const duration = 1000;

		animateScroll({targetPosition, initialPosition, duration});

		// Check if window.scrollTo was called with the correct arguments.
		expect(window.scrollTo).toHaveBeenCalledWith(0, targetPosition);
	});
});
