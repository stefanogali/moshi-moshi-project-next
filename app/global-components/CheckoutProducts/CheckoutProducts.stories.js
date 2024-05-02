import CheckoutProductsComponent from "./CheckoutProducts";

export default {
	title: "Global Components/Checkout Products before payment",
	component: CheckoutProductsComponent,

	decorators: [
		(Story) => (
			<div className="container" style={{maxWidth: "1140px"}}>
				<div className="row">
					<div className="col" style={{paddingTop: "100px"}}>
						{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
						<Story />
					</div>
				</div>
			</div>
		),
	],
};

export const CheckoutProducts = {
	render: function Render(args) {
		return <CheckoutProductsComponent></CheckoutProductsComponent>;
	},
};
