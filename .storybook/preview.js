/** @type { import('@storybook/react').Preview } */

import configureStore from "@/app/hook-store/products-store";
configureStore();

import "bootstrap/dist/css/bootstrap.css";

const preview = {
    parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},

    tags: ["autodocs"]
};

export default preview;
