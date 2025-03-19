import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import * as demo from "@sanity/lib/demo";

export default defineType({
	name: "settings",
	title: "Settings",
	type: "document",
	icon: CogIcon,
	fields: [
		defineField({
			name: "title",
			title: "Título do blog",
			type: "string",
			initialValue: demo.title,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "Descrição do blog",
			type: "string",
			initialValue: demo.description,
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "ogImage",
			title: "Open Graph",
			type: "image",
			options: {
				hotspot: true,
				aiAssist: {
					imageDescriptionField: "alt",
				},
			},
			fields: [
				defineField({
					name: "alt",
					title: "Descrição da imagem",
					type: "string",
					validation: (rule) => {
						return rule.custom((alt, context) => {
							if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
								return "Required";
							}
							return true;
						});
					},
				}),
			],
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Settings",
			};
		},
	},
});
