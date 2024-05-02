import ContactFormComponent from "./ContactForm";

export default {
	title: "Home Page Sections/Contact Form section",
	component: ContactFormComponent,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{marginTop: "100px"}}>
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
};

export const ContactForm = {
	render: function Render(args) {
		return <ContactFormComponent {...args}></ContactFormComponent>;
	},
};
