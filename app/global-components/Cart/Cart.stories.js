import CartComponent from "./Cart";

export default {
	title: "Global Components/Cart with overlay",
	component: CartComponent,

	decorators: [
		(Story) => (
			<div className="container" style={{maxWidth: "1140px"}}>
				<div className="row">
					<div className="col-lg-3" style={{marginLeft: "auto", marginRight: "auto"}}>
						{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
						<Story />
					</div>
				</div>
			</div>
		),
	],
};

export const Cart = {
	render: function Render(args) {
		return <CartComponent></CartComponent>;
	},
};
