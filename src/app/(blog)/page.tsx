import { Suspense } from "react";
import MostViewedPosts from "@components/shared/mostViewedPosts";
import LatestPosts from "@components/shared/latestPosts";
import MostViewedCategories from "@components/shared/mostViewedCategories";
import { postsQuery } from "@sanity/lib/queries";
import PostsByCategory from "@components/home/postsByCategory";
import PostsByTag from "@components/home/postsByTag";
import Categories from "@components/shared/categories";
import Loading from "@components/shared/loading";

export default function Page() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<PostsByTag tag="em-alta" />
			</Suspense>
			<div className="container mx-auto px-6 pt-10">
				<Suspense fallback={<Loading />}>
					<MostViewedPosts query={postsQuery} />
				</Suspense>
				<Suspense fallback={<Loading />}>
					<LatestPosts />
					<MostViewedCategories />
				</Suspense>
			</div>
			<Suspense fallback={<Loading />}>
				<PostsByCategory category="beneficios" />
				<section className="container mx-auto px-6 pt-10">
					<Categories />
				</section>
			</Suspense>
		</>
	);
}
