import Header from "./Header";

export default {
	title: "Global Components/Header",
	component: Header,
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
	decorators: [
		(Story) => (
			<div className="container">
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
};

export const HeaderElement = {
	render: function Render(args) {
		return <Header {...args}></Header>;
	},
};
