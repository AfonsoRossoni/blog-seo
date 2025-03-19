import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@sanity/lib/api";

export interface SiteInfo {
	siteUrl: string;
	siteName: string;
}

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || "",
	dataset: dataset || "",
});

export function getSiteInfo(): SiteInfo {
	return {
		siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
		siteName: process.env.NEXT_PUBLIC_SITE_NAME || "",
	};
}

export const urlForImage = (source: any) => {
	if (!source?.asset?._ref) {
		return undefined;
	}

	return imageBuilder?.image(source).auto("format").fit("max");
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
	if (!image) return;
	const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
	if (!url) return;
	return { url, alt: image?.alt as string, width, height };
}

export interface GenerateMetadataProps {
	title?: string;
	description?: string;
	defaultTitle: string;
	defaultDescription: string;
	image?: any;
}

export function generatePageMetadata({
	title,
	description,
	defaultTitle,
	defaultDescription,
	image,
}: GenerateMetadataProps) {
	const finalTitle = title || defaultTitle;
	const finalDescription = description || defaultDescription;
	const ogImage = image ? resolveOpenGraphImage(image) : undefined;

	return {
		title: finalTitle,
		description: finalDescription,
		openGraph: {
			title: finalTitle,
			description: finalDescription,
			...(ogImage && { images: [ogImage] }),
		},
		twitter: {
			...(ogImage && { card: "summary_large_image" }),
			title: finalTitle,
			description: finalDescription,
			...(ogImage && { images: [ogImage] }),
		},
	};
}
