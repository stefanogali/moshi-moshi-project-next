/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
    stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@chromatic-com/storybook",
        "@storybook/addon-docs"
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
