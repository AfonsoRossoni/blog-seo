import "../styles/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	variable: "--font-poppins",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export { metadata, viewport } from "next-sanity/studio";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={poppins.variable}>
			<body className="min-h-screen">{children}</body>
		</html>
	);
}
