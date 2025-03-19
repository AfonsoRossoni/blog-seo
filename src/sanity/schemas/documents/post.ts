import { DocumentTextIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";
import authorType from "./author";
import categoryType from "./category";
import tagType from "./tag";

export default defineType({
	name: "post",
	title: "Post",
	icon: DocumentTextIcon,
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Título",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "content",
			title: "Conteúdo",
			type: "array",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "excerpt",
			title: "Resumo",
			type: "text",
		}),
		defineField({
			name: "coverImage",
			title: "Banner",
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
					title: "Descrição da imagem",
					validation: (rule) => {
						return rule.custom((alt, context) => {
							if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
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
			name: "date",
			title: "Data",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: "author",
			title: "Autor",
			type: "reference",
			to: [{ type: authorType.name }],
		}),
		defineField({
			name: "category",
			title: "Categoria",
			type: "reference",
			to: [{ type: categoryType.name }],
		}),
		defineField({
			name: "tag",
			title: "Tag",
			type: "reference",
			to: [{ type: tagType.name }],
		}),
	],
	preview: {
		select: {
			title: "title",
			author: "author.name",
			category: "category.name",
			tag: "tag.name",
			date: "date",
			media: "coverImage",
		},
		prepare({ title, media, author, date }) {
			const subtitles = [
				author && `Por ${author}, da SINKO`,
				date && `${format(parseISO(date), "dd/MM/yyyy")}`,
			].filter(Boolean);

			return { title, media, subtitle: subtitles.join(" ") };
		},
	},
});
