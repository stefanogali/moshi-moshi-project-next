import Navigation from "./Navigation";

export default {
	title: "Global Components/Navigation",
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	component: Navigation,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="container">
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
};

export const NavigationElement = {
	render: function Render(args) {
		return <Navigation {...args}></Navigation>;
	},
};
