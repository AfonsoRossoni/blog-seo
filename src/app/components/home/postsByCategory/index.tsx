import st from "./index.module.scss";
import { sanityFetch } from "@sanity/lib/fetch";
import { postsByCategorySlugQuery } from "@sanity/lib/queries";
import Posts from "@components/shared/posts";

interface PostsByCategoryProps {
	category: string;
}

export default async function PostsByCategory({ category }: PostsByCategoryProps) {
	const postsByCategory = await sanityFetch({
		query: postsByCategorySlugQuery,
		params: { slug: category, order: "date" },
	});
	if (!postsByCategory || postsByCategory.posts.length === 0) return null;

	return (
		<div className={st.postsByCategory}>
			<div className="container mx-auto px-6 py-10">
				<Posts data={postsByCategory.posts} title="Planejar para conquistar" />
			</div>
		</div>
	);
}
