import PaypalButtonsComponent from "./PaypalButtons";
import {fn} from "@storybook/test";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const initialOptions = {
	clientId: "sb",
	currency: "GBP",
	intent: "capture",
};

export default {
	title: "Global Components/Paypal Buttons Checkout",
	component: PaypalButtonsComponent,
	tags: ["autodocs"],
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
		setIsPaypalError: fn(),
		setIsTransactionSuccess: fn(),
		setIsConfettiVisible: fn(),
	},
	render: function Render(args) {
		return <PaypalButtonsComponent {...args}></PaypalButtonsComponent>;
	},
};
