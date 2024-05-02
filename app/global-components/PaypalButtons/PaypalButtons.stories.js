import PaypalButtonsComponent from "./PaypalButtons";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const initialOptions = {
	clientId: "sb",
	currency: "GBP",
	intent: "capture",
};

export default {
	title: "Global Components/Paypal Buttons Checkout",
	component: PaypalButtonsComponent,
	decorators: [
		(Story) => (
			<PayPalScriptProvider options={initialOptions}>
				<div className="container">
					{/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
					<Story />
				</div>
			</PayPalScriptProvider>
		),
	],
};

export const PaypalButtons = {
	args: {
		products: [],
	},
	render: function Render(args) {
		return <PaypalButtonsComponent {...args}></PaypalButtonsComponent>;
	},
};
