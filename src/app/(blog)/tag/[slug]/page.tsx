import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/fetch";
import { postsByTagSlugQuery, tagSlugs } from "@sanity/lib/queries";
import { cache } from "react";
import DefaultPage from "@components/shared/defaultPage";
import { generatePageMetadata } from "@utils/general";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	return await sanityFetch({
		query: tagSlugs,
		perspective: "published",
		stega: false,
	});
}

const getTag = cache(async (params: Props["params"]) => {
	const resolvedParams = await params;
	const queryParams = { slug: resolvedParams.slug, order: "date" };
	return await sanityFetch({
		query: postsByTagSlugQuery,
		params: queryParams,
		stega: false,
	});
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const tag = await getTag(params);
	const defaultTitle = "Tag não encontrada";
	const defaultDescription = "A tag que você está procurando não foi encontrada.";

	if (!tag) {
		return generatePageMetadata({
			defaultTitle,
			defaultDescription,
		});
	}

	return generatePageMetadata({
		title: tag.title || defaultTitle,
		description: tag.description || undefined,
		defaultTitle,
		defaultDescription,
	});
}

export default async function TagPage({ params }: Props) {
	const resolvedParams = await params;
	const tag = await getTag(params);
	if (!tag) {
		return notFound();
	}

	return (
		<DefaultPage
			pathname={`/tag/${resolvedParams.slug}`}
			posts={tag}
			slug={resolvedParams.slug}
			query={postsByTagSlugQuery}
			title={tag.title}
			description={tag.description}
		/>
	);
}
