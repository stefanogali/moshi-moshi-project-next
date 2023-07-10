import {PayPalButtons} from "@paypal/react-paypal-js";
import {useStore} from "@/app/hook-store/store";

export default function PaypalButtons({products, setIsPaypalError, setIsTransactionSuccess, setIsConfettiVisible}) {
	const dispatch = useStore()[1];

	const cart = products.map((obj) => {
		return {name: obj.name, description: obj.selectedSize, id: obj.id};
	});

	const createOrder = (data) => {
		// Order is created on the server and the order id is returned
		return (
			fetch("http://localhost:3000/api/create-paypal-order", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				// use the "body" param to optionally pass additional order information
				// like product skus and quantities
				body: JSON.stringify({
					cart: cart,
				}),
			})
				.then((response) => response.json())
				// .then((order) => order.id);
				.then((order) => order.id)
				.then((cart) => cart)
		);
	};
	const onApprove = (data) => {
		// Order is captured on the server and the response is returned to the browser
		return fetch("http://localhost:3000/api/capture-paypal-order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				orderID: data.orderID,
				cart: cart,
			}),
		})
			.then((response) => response.json())
			.then((responseStatus) => {
				const {message, status} = responseStatus;
				if (status === 200) {
					setIsTransactionSuccess(true);
					setIsConfettiVisible(true);
				} else {
					setIsPaypalError(true);
				}
				// remove everything from cart
				window.localStorage.removeItem("cartProducts");
				dispatch("CLEAR_CART");
			});
	};
	return (
		<>
			<PayPalButtons
				createOrder={(data, actions) => createOrder(data, actions)}
				onApprove={(data, actions) => onApprove(data, actions)}
				onError={(error) => {
					setIsPaypalError(true);
					window.localStorage.removeItem("cartProducts");
					dispatch("CLEAR_CART");
				}}
			/>
		</>
	);
}
