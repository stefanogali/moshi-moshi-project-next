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
		includePaths: [path.join(__dirname, "node_modules")],
	},
};

module.exports = nextConfig;
