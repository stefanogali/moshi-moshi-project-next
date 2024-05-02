import SpinnerComponent from "./Spinner";

export default {
	title: "Global Components/Spinner wheel",
	component: SpinnerComponent,
	decorators: [
		(Story) => (
			<div className="container">
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
};

export const Spinner = {
	args: {
		isContactFormLoader: false,
	},
	render: function Render(args) {
		return <SpinnerComponent {...args}></SpinnerComponent>;
	},
};
