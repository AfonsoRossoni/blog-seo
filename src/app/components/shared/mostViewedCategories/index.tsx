import st from "./index.module.scss";
import { clsx } from "clsx";
import { sanityFetch } from "@sanity/lib/fetch";
import { categoriesQuery } from "@sanity/lib/queries";
import Link from "next/link";

interface MostViewedCategoriesProps {
	type?: "full" | "compact";
}

export default async function MostViewedCategories({ type = "full" }: MostViewedCategoriesProps) {
	const categories = await sanityFetch({
		query: categoriesQuery,
		params: { order: "views" },
		stega: false,
	});
	if (!categories || categories.length === 0) return null;

	return (
		<section
			className={clsx(st.mostViewedCategories, type === "compact" && st.compact, "wrapper")}
		>
			<h3>Assuntos mais acessados</h3>
			<div className={st.categories}>
				{categories?.map((category) => (
					<Link
						key={category._id}
						href={`/categoria/${category.slug}`}
						className="category category-large"
					>
						{category.title}
					</Link>
				))}
			</div>
		</section>
	);
}
