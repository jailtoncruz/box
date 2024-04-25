import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Heading, Text, Theme } from "@radix-ui/themes";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Box",
	description: "Box of everything.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Theme
					style={{
						...montserrat.style,
						backgroundColor: "#0D0D0D",
					}}
				>
					{children}
				</Theme>
			</body>
		</html>
	);
}
