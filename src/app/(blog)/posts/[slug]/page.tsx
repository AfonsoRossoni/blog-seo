import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/fetch";
import { postQuery, postSlugs } from "@sanity/lib/queries";
import Breadcrumb from "@components/shared/breadcrumb";
import Loading from "@components/shared/loading";
import { Suspense, cache } from "react";
import Content from "@components/post/content";
import { generatePageMetadata } from "@utils/general";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	return await sanityFetch({
		query: postSlugs,
		perspective: "published",
		stega: false,
	});
}

const getPost = cache(async (params: Props["params"]) => {
	return await sanityFetch({
		query: postQuery,
		params,
		stega: false,
	});
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const post = await getPost(params);
	const defaultTitle = "Post não encontrado";
	const defaultDescription = "O post que você está procurando não foi encontrado.";

	if (!post) {
		return generatePageMetadata({
			defaultTitle,
			defaultDescription,
		});
	}

	return generatePageMetadata({
		title: post.title || defaultTitle,
		description: post.excerpt || undefined,
		defaultTitle,
		defaultDescription,
		image: post.coverImage,
	});
}

export default async function PostPage({ params }: Props) {
	const post = await getPost(params);
	if (!post) {
		return notFound();
	}

	return (
		<>
			<Suspense fallback={<Loading />}>
				<Breadcrumb pathname={`/posts/${post.slug}`} post={post} />
			</Suspense>
			<Content post={post} />
		</>
	);
}
