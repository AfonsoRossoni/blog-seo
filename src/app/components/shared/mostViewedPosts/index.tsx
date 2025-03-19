import Posts from "@components/shared/posts";
import HeroPost from "@components/shared/heroPost";
import { sanityFetch } from "@sanity/lib/fetch";
import st from "./index.module.scss";
import { clsx } from "clsx";

interface MostViewedPostsProps {
	query: string;
	params?: {
		order?: string;
		limit?: number;
		slug?: string;
	};
	disableHero?: boolean;
}

export default async function MostViewedPosts({
	query,
	params = {
		limit: 5,
		order: "views",
		slug: "",
	},
	disableHero = false,
}: MostViewedPostsProps) {
	const data = await sanityFetch({
		query,
		params,
	});
	const primaryPost = data.posts[0];
	const otherPosts = disableHero ? data.posts : data.posts.slice(1);
	const title = "Mais lidas";

	return (
		<section className={clsx(st.mostViewedPosts, "wrapper")}>
			{!disableHero &&
				(primaryPost ? (
					<>
						<h3>{title}</h3>
						<HeroPost post={primaryPost} />
					</>
				) : (
					<h3 className={st.noPosts}>Nenhum post encontrado</h3>
				))}
			<Posts
				data={otherPosts}
				type={disableHero ? "compact" : "full"}
				title={disableHero ? title : ""}
			/>
		</section>
	);
}
