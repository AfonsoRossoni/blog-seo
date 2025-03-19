import Link from "next/link";
import ImageWrapper from "@components/shared/imageWrapper";
import DateComponent from "@components/shared/date";
import st from "./index.module.scss";
import { PostQueryResult } from "@/sanity.types";
import { clsx } from "clsx";

interface PostsProps {
	data: PostQueryResult[];
	title?: string;
	type?: "full" | "compact";
}

export default async function Posts({ data, title, type = "full" }: PostsProps) {
	if (!data || data.length === 0) return null;

	return (
		<section
			className={clsx(type === "compact" && st.compact)}
			aria-labelledby={title ? "posts-title" : undefined}
		>
			{title && (
				<h3 id="posts-title" className={st.title}>
					{title}
				</h3>
			)}
			<div className={clsx(st.wrapper, "flex")} role="list">
				{data.map((post) => (
					<article key={post?._id} className={st.post} role="listitem">
						<Link
							href={`/posts/${post?.slug}`}
							className="block"
							aria-label={`Ler artigo: ${post?.title}`}
						>
							<ImageWrapper
								image={post?.coverImage}
								fixedSize={type === "compact"}
								width={type === "compact" ? 150 : 335}
								height={type === "compact" ? 150 : 167}
							/>
						</Link>
						{post?.category && type === "full" && (
							<p
								className="category body-2"
								aria-label={`Categoria: ${post?.category.title}`}
							>
								{post?.category.title}
							</p>
						)}
						<div className={st.content}>
							<h5>
								<Link
									href={`/posts/${post?.slug}`}
									aria-label={`Ler artigo: ${post?.title}`}
								>
									{post?.title}
								</Link>
							</h5>
							{post?.date && (
								<div className={st.date}>
									<DateComponent
										dateString={post?.date}
										ariaLabel={`Data de publicação do artigo: ${post?.title}`}
									/>
								</div>
							)}
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
