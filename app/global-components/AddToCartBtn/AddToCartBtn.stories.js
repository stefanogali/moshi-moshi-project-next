import AddToCartBtn from "./AddToCartBtn";

export default {
	title: "Global Components/Add To Cart Button",
	component: AddToCartBtn,
	decorators: [
		(Story) => (
			<div style={{margin: "8em"}}>
				{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
				<Story />
			</div>
		),
	],
};

export const Primary = {
	args: {
		isActive: true,
		productImage: "sadgirl1.webp",
		id: 1,
		selectedSize: "Small",
		price: 15,
		name: "Sad Girl #1",
	},
	render: function Render(args) {
		// function onClick() {
		// 	console.log("hello");
		// }

		return <AddToCartBtn {...args}></AddToCartBtn>;
	},
};
