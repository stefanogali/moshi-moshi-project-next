import CheckoutSummary from "./CheckoutSummary";

export default {
	title: "Global Components/Summary price on checkout",
	component: CheckoutSummary,
	decorators: [
		(Story) => (
			<div className="container">
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
};

export const CheckoutSummaryPrice = {
	args: {
		totalAmount: 15,
	},
	render: function Render(args) {
		return <CheckoutSummary {...args}></CheckoutSummary>;
	},
};
