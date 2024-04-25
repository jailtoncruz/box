import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				black: {
					900: "#0D0D0D",
				},
				gray: {
					200: "#DADADA",
					400: "#8C8C8C",
					600: "#404040",
					800: "#202020",
				},
			},
		},
	},
	plugins: [],
};
export default config;
