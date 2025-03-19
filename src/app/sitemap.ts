import { sanityFetch } from "@sanity/lib/fetch";
import { allPostsUrlsQuery } from "@sanity/lib/queries";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const sitemap = [];
	const posts = await sanityFetch({ query: allPostsUrlsQuery });
	const postUrls = posts.map((post: { url: string | null; lastModified: string }) => ({
		url: post.url ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.url}` : "",
		lastModified: new Date(post.lastModified).toISOString().split("T")[0],
	}));

	sitemap.push(...postUrls);

	return sitemap;
}
