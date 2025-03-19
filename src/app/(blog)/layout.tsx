import "../styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";
import * as demo from "@sanity/lib/demo";
import { sanityFetch } from "@sanity/lib/fetch";
import { settingsQuery } from "@sanity/lib/queries";
import { resolveOpenGraphImage } from "@utils/general";
import { draftMode } from "next/headers";
import AlertBanner from "@components/shared/alert-banner";
import { VisualEditing } from "next-sanity";

export async function generateMetadata(): Promise<Metadata> {
	const settings = await sanityFetch({
		query: settingsQuery,
		stega: false,
	});
	const title = settings?.title || demo.title;
	const description = settings?.description || demo.description;
	const ogImage = resolveOpenGraphImage(settings?.ogImage);

	return {
		title: {
			template: `%s | ${title}`,
			default: title,
		},
		description,
		openGraph: {
			images: ogImage ? [ogImage] : [],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ogImage ? [ogImage] : [],
		},
	};
}

const poppins = Poppins({
	variable: "--font-poppins",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isEnabled: isDraftMode } = await draftMode();

	return (
		<html lang="pt-br" className={poppins.variable}>
			<body>
				<section className="min-h-screen">
					{isDraftMode && <AlertBanner />}
					<Header />
					<main>{children}</main>
					<Footer />
				</section>
				{isDraftMode && <VisualEditing />}
			</body>
		</html>
	);
}
