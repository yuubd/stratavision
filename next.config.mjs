/** @type {import('next').NextConfig} */
const config = {
	experimental: {
		esmExternals: "loose",
	},
	// Enable standalone output for Docker
	output: 'standalone',
	// Skip linting during build for Docker (fix linting issues separately)
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default config;
