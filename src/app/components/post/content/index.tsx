import { type PortableTextBlock } from "next-sanity";
import ImageWrapper from "@components/shared/imageWrapper";
import DateComponent from "@components/shared/date";
import PortableText from "@components/post/portableText";
import st from "./index.module.scss";
import { clsx } from "clsx";
import MostViewedCategories from "@components/shared/mostViewedCategories";
import FontSizeHandler from "@components/post/fontSizeHandler";
import { PostQueryResult } from "@/sanity.types";
import { Suspense } from "react";
import Loading from "@components/shared/loading";
import MostViewedPosts from "@components/shared/mostViewedPosts";
import { postsQuery } from "@sanity/lib/queries";
import { getArticleSchema } from "@utils/structuredData";
import Script from "next/script";

export default async function Content({ post }: { post: PostQueryResult }) {
	if (!post) {
		return;
	}

	const articleSchema = getArticleSchema(post);

	return (
		<div className={clsx(st.container, "container mx-auto px-6 py-10")}>
			<Script
				id="post-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
			/>
			<article className={st.post} aria-labelledby="post-title">
				{post.category && <p className="category body-2">{post.category.title}</p>}
				<h1 id="post-title">{post.title}</h1>
				<p>{post.excerpt}</p>
				<div className={st.info}>
					<p className="body-2">
						Publicado em <DateComponent dateString={post.date} />
					</p>
					<div className={st.divisor} role="separator" />
					{post.author && (
						<div className="flex items-center">
							<p className="body-2">Por {post.author.name}, da SINKO</p>
						</div>
					)}
				</div>
				<ImageWrapper image={post.coverImage} priority animate={false} />
				<FontSizeHandler />
				{post.content?.length && (
					<PortableText
						className="min-w-full"
						value={post.content as PortableTextBlock[]}
					/>
				)}
			</article>
			<aside className={clsx(st.sidebar)} aria-label="Conteúdo relacionado">
				<Suspense fallback={<Loading />}>
					<MostViewedPosts
						query={postsQuery}
						params={{ limit: 3, order: "views" }}
						disableHero
					/>
				</Suspense>
				<Suspense fallback={<Loading />}>
					<MostViewedCategories type="compact" />
				</Suspense>
			</aside>
		</div>
	);
}
