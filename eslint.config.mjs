import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import storybook from "eslint-plugin-storybook";

export default defineConfig([
	...nextVitals,
	...storybook.configs["flat/recommended"],
	{
		// TODO: refactor localStorage hydration in Cart / CheckoutProducts, then remove this override
		rules: {
			"react-hooks/set-state-in-effect": "warn",
		},
	},
	globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "storybook-static/**", "next-env.d.ts"]),
]);
