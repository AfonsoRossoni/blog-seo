import { Suspense } from "react";
import MostViewedPosts from "@components/shared/mostViewedPosts";
import LatestPosts from "@components/shared/latestPosts";
import Breadcrumb from "@components/shared/breadcrumb";
import Categories from "@components/shared/categories";
import Loading from "@components/shared/loading";

interface DefaultPageProps {
	posts?: any;
	slug?: string;
	pathname: string;
	query: string;
	title?: string | null;
	description?: string | null;
}

export default async function DefaultPage({
	posts,
	slug,
	pathname,
	query,
	title,
	description,
}: DefaultPageProps) {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Breadcrumb pathname={pathname} />
			</Suspense>
			<div className="container mx-auto px-6 py-10">
				{title && <h1 className="mb-6">{title}</h1>}
				{description && <p className="mb-10">{description}</p>}
				<Suspense fallback={<Loading />}>
					<MostViewedPosts query={query} params={{ slug, order: "views" }} />
				</Suspense>
				<LatestPosts posts={posts} />
				<Suspense fallback={<Loading />}>
					<Categories />
				</Suspense>
			</div>
		</>
	);
}
