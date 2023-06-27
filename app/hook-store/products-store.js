"use-client";

import {initStore} from "./store";

const setLocalStorage = (products) => {
	//set products in localstore object
	//products gonna disappear in cart after 5 days after been added
	const expiryDate = new Date();
	expiryDate.setDate(expiryDate.getDate() + 5);
	console.log(expiryDate);

	window.localStorage.setItem(
		"cartProducts",
		JSON.stringify({
			products: products,
			expiry: expiryDate,
		})
	);
};

const getLocalStorage = () => {
	let productsFromLocalStorage = window.localStorage.getItem("cartProducts");
	productsFromLocalStorage = JSON.parse(productsFromLocalStorage);
	return productsFromLocalStorage;
};

const configureStore = () => {
	let updatedProducts = [];

	let itemsInCart = 0;

	const actions = {
		ADD_PRODUCTS: (currentState, product) => {
			const productsFromLocalStorage = getLocalStorage();

			itemsInCart = currentState.products.length || productsFromLocalStorage?.products?.length || 0;

			if (itemsInCart < 5) {
				itemsInCart++;
				if (updatedProducts.length === 0 && productsFromLocalStorage?.products?.length) {
					updatedProducts = updatedProducts.concat(productsFromLocalStorage.products);
				}
				updatedProducts.push(product);
				setLocalStorage(updatedProducts);
				return {products: updatedProducts};
			}
			return;
		},
		REMOVE_PRODUCT: (currentState, productId) => {
			itemsInCart--;
			if (currentState.products.length === 0) {
				const productsFromLocalStorage = getLocalStorage();
				updatedProducts = productsFromLocalStorage.products;
			}
			updatedProducts.splice(
				updatedProducts.findIndex((item) => item.id === productId.id),
				1
			);
			setLocalStorage(updatedProducts);
			return {products: updatedProducts};
		},
	};

	initStore(actions, {products: []});
};

export default configureStore;
