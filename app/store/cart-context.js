"use client";

import React, {useState, useCallback} from "react";

const CartContext = React.createContext({
	products: [],
	addProducts: () => {},
});

export const CartContextProvider = ({children}) => {
	const [addedProducts, setAddedProducts] = useState([]);

	const addProducts = useCallback((product) => {
		setAddedProducts((prev) => {
			return [...prev, product];
		}, []);
	});

	return (
		<CartContext.Provider
			value={{
				products: addedProducts,
				addProducts: addProducts,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
