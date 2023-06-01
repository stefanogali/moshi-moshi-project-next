import {scrollTo} from "../../../helper-functions/animate-scroll";

const ScrollTo = ({
	toId,
	toRef,
	className,
	duration,
	children,
	setFocus,
	detractFromTop,
	router,
}) => {
	const clickHandler = () => {
		return scrollTo({
			id: toId,
			ref: toRef,
			duration,
			setFocus,
			detractFromTop,
			router,
		});
	};

	return (
		<div className={className} onClick={clickHandler}>
			{children}
		</div>
	);
};

export default ScrollTo;
