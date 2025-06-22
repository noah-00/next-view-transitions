import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s4.anilist.co",
				port: "",
				pathname: "/file/anilistcdn/**",
			},
			{
				protocol: "https",
				hostname: "img1.ak.crunchyroll.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
