import Link from "next/link";
import { sanityFetch } from "@sanity/lib/fetch";
import st from "./index.module.scss";
import clsx from "clsx";
import { categoryDataBySlugQuery, tagDataBySlugQuery } from "@sanity/lib/queries";
import { PostQueryResult } from "@/sanity.types";

interface Category {
	title: string;
	slug: string;
	type: "categoria" | "tag";
}

export default async function Breadcrumb({
	pathname,
	post,
}: {
	pathname: string;
	post?: PostQueryResult;
}) {
	const segments = pathname.split("/").filter(Boolean);

	let category: Category | null = null;

	if ((segments[0] === "categoria" || segments[0] === "tag") && segments[1]) {
		const query = segments[0] === "categoria" ? categoryDataBySlugQuery : tagDataBySlugQuery;
		const data = await sanityFetch({
			query,
			params: { slug: segments[1] },
		});

		if (data?.title && data?.slug) {
			category = {
				title: data.title,
				slug: data.slug,
				type: segments[0] as "categoria" | "tag",
			};
		}
	}

	if (post?.category) {
		category = {
			title: post.category.title,
			slug:
				typeof post.category.slug === "string"
					? post.category.slug
					: (post.category.slug as { current: string }).current || "uncategorized",
			type: "categoria",
		};
	}

	return (
		<div className={clsx(st.breadcrumb, "container mx-auto px-6")}>
			<nav className="flex items-center" aria-label="Breadcrumb">
				<ol className={clsx(st.items, "flex items-center")}>
					<li>
						<Link href="/">Blog</Link>
					</li>
					{category && (
						<li>
							<span className={st.separator}>{">"}</span>
							<Link href={`/${category.type}/${category.slug}`}>
								{category.title}
							</Link>
						</li>
					)}
					{post && (
						<li>
							<span className={st.separator}>{">"}</span>
							<span aria-current="page">{post.title}</span>
						</li>
					)}
				</ol>
			</nav>
		</div>
	);
}
