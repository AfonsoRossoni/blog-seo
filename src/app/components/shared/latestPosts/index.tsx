import { sanityFetch } from "@sanity/lib/fetch";
import { postsQuery } from "@sanity/lib/queries";
import ResponsiveCarousel from "../carousel";
import { PostsQueryResult } from "@/sanity.types";
import Script from "next/script";
import { getBlogSchema } from "@utils/structuredData";

interface LatestPostsProps {
	posts?: PostsQueryResult;
}

export default async function LatestPosts({ posts }: LatestPostsProps) {
	let data = posts;
	if (!data) {
		data = await sanityFetch({
			query: postsQuery,
			params: {
				order: "date",
				limit: 5,
			},
		});
	}
	if (data.posts.length === 0) return;

	const blogSchema = getBlogSchema(data.posts);

	return (
		<section className="wrapper py-14" aria-labelledby="latest-posts-title">
			<Script
				id="latest-posts-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
			/>
			<h3 id="latest-posts-title">Últimas notícias</h3>
			<ResponsiveCarousel posts={data.posts} />
		</section>
	);
}
