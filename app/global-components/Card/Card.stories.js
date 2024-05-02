import Card from "./Card";
import configureStore from "@/app/hook-store/products-store";

configureStore();

export default {
	title: "Product card",
	component: Card,

	argTypes: {
		index: {
			control: false,
		},
		productImage: {
			options: ["sadgirl1.webp", "sadgirl2.webp", "sadgirl3.webp", "sunglasses1.webp", "sunglasses2.webp", "sunglasses3.webp", "notageisha1.webp", "notageisha2.webp", "notageisha3.webp"],
			control: {type: "select"},
		},
		productShowImage: {
			options: ["sadgirl1-show.webp", "sadgirl2-show.webp", "sadgirl3-show.webp", "sunglasses1-show.webp", "sunglasses2-show.webp", "sunglasses3-show.webp", "notageisha1-show.webp", "notageisha2-show.webp", "notageisha3-show.webp"],
			control: {type: "select"},
		},
	},
	parameters: {
		backgrounds: {
			default: "light bg",
			values: [{name: "light bg", value: "#f6f7fc"}],
		},
	},
	decorators: [
		(Story) => (
			<div className="row">
				<div className="col" style={{maxWidth: "855px"}}>
					{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
					<Story />
				</div>
			</div>
		),
	],
};

export const CardProduct = {
	args: {
		id: 1,
		name: "Sad Girl #1",
		productImage: "sadgirl1.webp",
		productShowImage: "sadgirl1-show.webp",
		description: "Women' s rolled sleeve tunic t-shirt.",
		material: "100% Combed Cotton Fine Jersey 115g.",
		shortDescription: "Original japanese t-shirt design.",
		isActive: true,
		availability: [
			{
				size: "Small",
				availability: 5,
			},
			{
				size: "Medium",
				availability: 5,
			},
			{
				size: "Large",
				availability: 5,
			},
		],
		price: 15,
		index: 0,
	},
	render: function Render(args) {
		function onClick() {
			console.log("hello");
		}

		return <Card {...args}></Card>;
	},
};
