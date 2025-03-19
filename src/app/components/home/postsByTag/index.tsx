import st from "./index.module.scss";
import { sanityFetch } from "@sanity/lib/fetch";
import { postsByTagSlugQuery } from "@sanity/lib/queries";
import ImageWrapper from "@components/shared/imageWrapper";
import Arrow from "@components/shared/arrow";
import Link from "next/link";
import { clsx } from "clsx";

interface PostsByTagProps {
	tag: string;
}

export default async function PostsByTag({ tag }: PostsByTagProps) {
	const data = await sanityFetch({
		query: postsByTagSlugQuery,
		params: { slug: tag, order: "date" },
	});
	if (!data || data.posts.length === 0) return null;

	return (
		<section className={st.postsByTag} aria-labelledby="posts-by-tag-title">
			<div className="container mx-auto px-6 py-10">
				<div className="flex" role="list">
					{data.posts.map((post) => {
						if (!post) return null;

						return (
							<article
								key={post._id}
								className={st.post}
								role="listitem"
								aria-labelledby={`post-${post._id}-title`}
							>
								<Link
									href={`/posts/${post.slug}`}
									aria-label={`Ler artigo: ${post.title}`}
								>
									<ImageWrapper
										image={post.coverImage}
										width={100}
										height={160}
										fixedSize
									/>
								</Link>
								<div className={st.content}>
									{post.tag && (
										<Link
											href={`/tag/${post.tag.slug}`}
											className={st.tag}
											aria-label={`Ver todos os artigos da tag: ${post.tag.title}`}
										>
											<ImageWrapper
												image={post.tag.icon}
												width={16}
												height={16}
												fixedSize
											/>
											<p>{post.tag.title}</p>
										</Link>
									)}
									<Link
										href={`/posts/${post.slug}`}
										aria-label={`Ler artigo: ${post.title}`}
									>
										<h5
											id={`post-${post._id}-title`}
											className={clsx(st.title, "body-2")}
										>
											{post.title}
										</h5>
										<Arrow
											direction="right"
											color="var(--primary-color)"
											size={16}
											aria-hidden="true"
										/>
									</Link>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
