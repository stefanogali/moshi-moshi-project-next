import CardProductCheckout from "./CardProductCheckout";

export default {
	title: "Global Components/Product on checkout card",
	component: CardProductCheckout,

	argTypes: {
		productImage: {
			options: ["sadgirl1.webp", "sadgirl2.webp", "sadgirl3.webp", "sunglasses1.webp", "sunglasses2.webp", "sunglasses3.webp", "notageisha1.webp", "notageisha2.webp", "notageisha3.webp"],
			control: {type: "select"},
		},
		productName: {
			options: ["Sad Girl #1", "Sad Girl #2", "Sad Girl #3", "Sunglasses #1", "Sunglasses #2", "Sunglasses #3", "Not a Geisha #1", "Not a Geisha #2", "Not a Geisha #3"],
			control: {type: "select"},
		},
		size: {
			options: ["Small", "Medium", "Large", "XL"],
			control: {type: "radio"},
		},
	},
	decorators: [
		(Story) => (
			<div className="container" style={{maxWidth: "1140px"}}>
				<div className="row" style={{justifyContent: "center"}}>
					<div className="col-md-8 col-12">
						{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
						<Story />
					</div>
				</div>
			</div>
		),
	],
};

export const CardCheckout = {
	args: {
		productImage: "sadgirl1.webp",
		productName: "Sad Girl #1",
		size: "Small",
	},
	render: function Render(args) {
		return <CardProductCheckout {...args}></CardProductCheckout>;
	},
};
