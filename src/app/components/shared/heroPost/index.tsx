import Link from "next/link";
import ImageWrapper from "@components/shared/imageWrapper";
import type { PostQueryResult } from "@/sanity.types";
import st from "./index.module.scss";
import { clsx } from "clsx";

interface HeroPostProps {
	post: PostQueryResult;
}

export default function HeroPost({ post }: HeroPostProps) {
	if (!post) return;

	return (
		<article aria-labelledby={`hero-post-${post.slug}`}>
			<Link
				className={clsx(st.post, "block relative")}
				href={`/posts/${post.slug}`}
				aria-label={`Ler artigo em destaque: ${post.title}`}
			>
				<ImageWrapper image={post.coverImage} priority width={1500} height={465} />
				<div
					className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-center bg-gradient-to-t from-black pointer-events-none"
					role="presentation"
					aria-hidden="true"
				>
					<div className={st.content}>
						{post.category && (
							<p
								className="category body-2"
								aria-label={`Categoria: ${post.category.title}`}
							>
								{post.category.title}
							</p>
						)}
						<h2 id={`hero-post-${post.slug}`}>{post.title}</h2>
						{post.excerpt && (
							<p className="body-2" aria-label="Resumo do artigo">
								{post.excerpt}
							</p>
						)}
					</div>
				</div>
			</Link>
		</article>
	);
}
