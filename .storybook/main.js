/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
    stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
        "@storybook/addon-mdx-gfm"
    ],

    framework: {
		name: "@storybook/nextjs",
		options: {},
	},

    docs: {},

    staticDirs: ["../public"],

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};
export default config;
