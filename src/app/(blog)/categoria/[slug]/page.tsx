import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity/lib/fetch";
import { categorySlugs, postsByCategorySlugQuery } from "@sanity/lib/queries";
import { cache } from "react";
import DefaultPage from "@components/shared/defaultPage";

type Props = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	return await sanityFetch({
		query: categorySlugs,
		perspective: "published",
		stega: false,
	});
}

const getCategory = cache(async (params: Props["params"]) => {
	const resolvedParams = await params;
	const queryParams = { slug: resolvedParams.slug, order: "views" };
	return await sanityFetch({
		query: postsByCategorySlugQuery,
		params: queryParams,
		stega: false,
	});
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const category = await getCategory(params);
	const defaultTitle = "Categoria não encontrada";
	const defaultDescription = "A categoria que você está procurando não foi encontrada.";

	if (!category) {
		return {
			title: defaultTitle,
			description: defaultDescription,
		};
	}

	return {
		title: category.title || defaultTitle,
		description: category.description || undefined,
	};
}

export default async function CategoryPage({ params }: Props) {
	const resolvedParams = await params;
	const category = await getCategory(params);

	if (!category) {
		return notFound();
	}

	return (
		<DefaultPage
			pathname={`/categoria/${resolvedParams.slug}`}
			posts={category}
			slug={resolvedParams.slug}
			query={postsByCategorySlugQuery}
			title={category.title}
			description={category.description}
		/>
	);
}
