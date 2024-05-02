import AboutComponent from "./About";

export default {
	title: "Home Page Sections/About Section",
	component: AboutComponent,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div>
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
};

export const AboutElement = {
	render: function Render(args) {
		return <AboutComponent {...args}></AboutComponent>;
	},
};
