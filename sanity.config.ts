"use client";

import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import {
	presentationTool,
	defineDocuments,
	defineLocations,
	type DocumentLocation,
} from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@sanity/lib/api";
import { pageStructure, singletonPlugin } from "@sanity/plugins/settings";
import { assistWithPresets } from "@sanity/plugins/assist";
import author from "@sanity/schemas/documents/author";
import post from "@sanity/schemas/documents/post";
import category from "@sanity/schemas/documents/category";
import tag from "@sanity/schemas/documents/tag";
import settings from "@sanity/schemas/singletons/settings";

export default defineConfig({
	basePath: studioUrl,
	projectId,
	dataset,
	schema: {
		types: [settings, post, author, category, tag],
	},
	plugins: [
		presentationTool({
			resolve: {
				mainDocuments: defineDocuments([
					{
						route: "/posts/:slug",
						filter: `_type == "post" && slug.current == $slug`,
					},
					{
						route: "/categoria/:slug",
						filter: `_type == "category" && slug.current == $slug`,
					},
					{
						route: "/tag/:slug",
						filter: `_type == "tag" && slug.current == $slug`,
					},
				]),
			},
			previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
		}),
		structureTool({ structure: pageStructure([settings]) }),
		singletonPlugin([settings.name]),
		unsplashImageAsset(),
		assistWithPresets(),
		process.env.NODE_ENV === "development" && visionTool({ defaultApiVersion: apiVersion }),
	].filter(Boolean) as PluginOptions[],
});
