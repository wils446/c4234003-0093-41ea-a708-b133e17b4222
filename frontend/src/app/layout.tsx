"use client";
import { ApiProvider } from "@/commons/providers";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ApiProvider>{children}</ApiProvider>
			</body>
		</html>
	);
}
