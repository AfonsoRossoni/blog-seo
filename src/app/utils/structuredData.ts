import { PostQueryResult } from "@/sanity.types";
import { getSiteInfo, urlForImage } from "./general";
import type { Article, BlogPosting, Organization, Blog, WithContext } from "schema-dts";

const { siteUrl, siteName } = getSiteInfo();

export function getPublisherSchema() {
	const publisher: WithContext<Organization> = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: siteName,
		logo: {
			"@type": "ImageObject",
			url: `${siteUrl}/logo.png`,
		},
	};
	return publisher;
}

export function getBlogPostingSchema(post: PostQueryResult) {
	if (!post) return;

	const blogPosting: BlogPosting = {
		"@type": "BlogPosting",
		headline: post.title,
		image: urlForImage(post.coverImage)?.url(),
		datePublished: post.date,
		dateModified: post.date,
		author: {
			"@type": "Person",
			name: post.author?.name || siteName,
		},
		publisher: getPublisherSchema(),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${siteUrl}/posts/${post.slug}`,
		},
	};
	return blogPosting;
}

export function getArticleSchema(post: PostQueryResult) {
	if (!post) return;

	const article: WithContext<Article> = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.excerpt || "",
		image: urlForImage(post.coverImage)?.url(),
		url: `${siteUrl}/posts/${post.slug}`,
		author: {
			"@type": "Person",
			name: post.author?.name || siteName,
		},
		publisher: getPublisherSchema(),
		datePublished: post.date,
	};
	return article;
}

export function getBlogSchema(posts: PostQueryResult[]) {
	if (!posts) return;

	const blogPostingSchema = posts.map((post) => getBlogPostingSchema(post)) as BlogPosting[];
	const blog: WithContext<Blog> = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "Latest News",
		description: "The most recent blog posts and articles from our website",
		blogPost: blogPostingSchema,
		url: "/",
	};
	return blog;
}
