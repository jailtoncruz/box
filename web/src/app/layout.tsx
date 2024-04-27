import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BoxQueryProvider } from "@/components/query-provider";

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
						display: "flex",
					}}
					appearance="dark"
				>
					<BoxQueryProvider>{children}</BoxQueryProvider>
					<ToastContainer theme="dark" />
				</Theme>
			</body>
		</html>
	);
}
