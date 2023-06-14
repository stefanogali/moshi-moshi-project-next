"use-client";

import {initStore} from "./store";

const configureStore = () => {
	let updatedProducts = [];
	let itemsInCart = 0;

	const actions = {
		ADD_PRODUCTS: (currentState, product) => {
			if (itemsInCart < 5) {
				itemsInCart++;
				updatedProducts.push(product);
				return {products: updatedProducts};
			}
			return;
		},
		REMOVE_PRODUCT: (currentState, productId) => {
			itemsInCart--;
			updatedProducts.splice(
				updatedProducts.findIndex((item) => item.id === productId.id),
				1
			);
			return {products: updatedProducts};
		},
	};

	initStore(actions, {products: []});
};

export default configureStore;
