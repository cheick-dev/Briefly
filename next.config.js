/** @type {import('next').NextConfig} */
const nextConfig = {
	//   output: 'export',
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: { unoptimized: true },
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
