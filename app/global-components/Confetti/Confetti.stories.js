import Confetti from "./Confetti";

export default {
	title: "Global Components/Confetti after purchase",
	component: Confetti,
	decorators: [
		(Story) => (
			<div className="container">
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
};

export const ConfettiSuccess = {
	render: function Render(args) {
		return <Confetti {...args}></Confetti>;
	},
};
