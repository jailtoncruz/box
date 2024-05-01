/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				hostname: "*.cloudflarestorage.com",
			},
		],
	},
};

export default nextConfig;
