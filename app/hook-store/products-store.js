"use-client";

import {initStore} from "./store";

const configureStore = () => {
	let updatedProducts = [];
	const actions = {
		ADD_PRODUCTS: (currentState, product) => {
			updatedProducts.push(product);
			return {products: updatedProducts};
		},
	};

	initStore(actions, {products: []});
};

export default configureStore;
