"use client";
let globalState = {};
let listeners = [];
let actions = {};

import {useState, useEffect} from "react";

export const useStore = (shouldListen = true) => {
	const [state, setState] = useState(globalState);

	const dispatch = (actionIdentifier, product) => {
		const newState = actions[actionIdentifier](globalState, product);
		globalState = {...globalState, ...newState};

		for (const listener of listeners) {
			listener(globalState);
		}
	};

	useEffect(() => {
		if (shouldListen) {
			listeners.push(setState);
		}

		return () => {
			if (shouldListen) {
				listeners = listeners.filter((li) => li !== setState);
			}
		};
	}, [shouldListen]);

	return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
	if (initialState) {
		globalState = {...globalState, ...initialState};
	}
	actions = {...actions, ...userActions};
};
