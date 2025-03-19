import { sanityFetch } from "@sanity/lib/fetch";
import { allPostsUrlsQuery, categorySlugs, tagSlugs } from "@sanity/lib/queries";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const lastModified = new Date().toISOString().split("T")[0];
	const sitemap: MetadataRoute.Sitemap = [
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
			lastModified,
		},
	];
	const posts = await sanityFetch({ query: allPostsUrlsQuery });
	const categories = await sanityFetch({ query: categorySlugs });
	const tags = await sanityFetch({ query: tagSlugs });

	const postUrls = posts.map((post: { url: string | null; lastModified: string }) => ({
		url: post.url ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.url}` : "",
		lastModified: new Date(post.lastModified).toISOString().split("T")[0],
	}));

	const categoryUrls = (categories as Array<{ slug: string | null }>)
		.filter((category) => category.slug !== null)
		.map((category) => ({
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${category.slug}`,
			lastModified,
		}));

	const tagUrls = (tags as Array<{ slug: string | null }>)
		.filter((tag) => tag.slug !== null)
		.map((tag) => ({
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/tag/${tag.slug}`,
			lastModified,
		}));

	sitemap.push(...postUrls, ...categoryUrls, ...tagUrls);

	return sitemap;
}
