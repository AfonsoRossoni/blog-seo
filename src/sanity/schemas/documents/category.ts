import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "category",
	title: "Categoria",
	type: "document",
	icon: FolderIcon,
	fields: [
		defineField({
			name: "title",
			title: "Nome",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "icon",
			title: "Ícone",
			type: "image",
			options: {
				hotspot: true,
				aiAssist: {
					imageDescriptionField: "alt",
				},
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Descrição do ícone",
					validation: (rule) => {
						return rule.custom((alt, context) => {
							if ((context.document?.icon as any)?.asset?._ref && !alt) {
								return "Required";
							}
							return true;
						});
					},
				},
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "Descrição",
			type: "text",
		}),
	],
});
