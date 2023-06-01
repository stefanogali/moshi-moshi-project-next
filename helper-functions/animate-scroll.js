// animateScroll.js
const pow = Math.pow;
// The easing function that makes the scroll decelerate over time
const easeOutQuart = (x) => {
	return 1 - pow(1 - x, 4);
};

const logError = () =>
	console.error(
		`Are you sure you've provided element id or react ref? Have you set the router?`
	);

const animateScroll = ({
	targetPosition,
	fullInitialPosition,
	initialPosition,
	duration,
	detractFromTop,
}) => {
	let start;
	let position;
	let animationFrame;
	const requestAnimationFrame = window.requestAnimationFrame;
	const cancelAnimationFrame = window.cancelAnimationFrame;
	// maximum amount of pixels we can scroll
	const maxAvailableScroll =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;
	const amountOfPixelsToScroll = initialPosition - targetPosition;

	function step(timestamp) {
		if (start === undefined) {
			start = timestamp;
		}
		const elapsed = timestamp - start;
		// this just gives us a number between 0 (start) and 1 (end)
		const relativeProgress = elapsed / duration;
		// ease out that number
		const easedProgress = easeOutQuart(relativeProgress);
		// calculate new position for every thick of the requesAnimationFrame
		position =
			initialPosition -
			amountOfPixelsToScroll * Math.min(easedProgress, 1) -
			detractFromTop;

		window.scrollTo(0, position);
		// Stop when max scroll is reached
		if (
			fullInitialPosition !== maxAvailableScroll &&
			window.scrollY === maxAvailableScroll
		) {
			cancelAnimationFrame(animationFrame);
			return;
		}
		// repeat until the end is reached
		if (elapsed < duration) {
			animationFrame = requestAnimationFrame(step);
		}
	}
	animationFrame = requestAnimationFrame(step);
};

const getOffset = (element, horizontal = false) => {
	if (!element) return 0;
	return (
		getOffset(element.offsetParent, horizontal) +
		(horizontal ? element.offsetLeft : element.offsetTop)
	);
};

const getElementPosition = (element) => getOffset(element);

export const scrollTo = ({
	id,
	ref = null,
	duration = 3000,
	setFocus = false,
	detractFromTop = 0,
	router = null,
}) => {
	// the position of the scroll bar before the user clicks the button
	const fullInitialPosition = window.scrollY;
	const initialPosition = window.scrollY + detractFromTop;

	const element = ref ? ref.current : id ? document.getElementById(id) : null;

	if (
		initialPosition === getElementPosition(element) &&
		ref.current !== null
	) {
		ref.current.focus();
		return;
	}

	if (!element) {
		if (router === null) {
			logError();
			return;
		}
		router.push(
			`/?setScroll=true&id=${id}&duration=${duration}&setFocus=${setFocus}&detractFromTop=${detractFromTop}`
		);
		return;
	}

	if (setFocus && ref.current !== null) {
		ref.current.focus();
	}
	animateScroll({
		targetPosition: getElementPosition(element),
		fullInitialPosition,
		initialPosition,
		duration,
		detractFromTop,
	});
};
