import { sanityFetch } from "@sanity/lib/fetch";
import { categoriesQuery } from "@sanity/lib/queries";
import { urlForImage } from "@utils/general";
import Link from "next/link";
import Image from "next/image";
import st from "./index.module.scss";

export default async function Categories() {
	const categories = await sanityFetch({
		query: categoriesQuery,
		params: { order: "date" },
	});

	if (!categories || categories.length === 0) return null;

	return (
		<div className={st.categories}>
			<h3>Navegue por categoria</h3>
			<div className={st.items}>
				{categories.map((category) => (
					<Link
						key={category._id}
						href={`/categoria/${category.slug}`}
						className={st.category}
					>
						<div className={st.header}>
							<h5>{category.title}</h5>
							{category.icon && (
								<Image
									src={urlForImage(category.icon)?.url() || ""}
									alt={category.title || ""}
									width={24}
									height={24}
									className={st.icon}
								/>
							)}
						</div>
						<p className="body-2">{category.description}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
