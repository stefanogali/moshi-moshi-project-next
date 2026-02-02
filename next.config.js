const path = require("path");
/**
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	sassOptions: {
		quietDeps: true, // hides deprecation warnings from node_modules
	},
};

module.exports = nextConfig;
