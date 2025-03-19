import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "author",
	title: "Autor",
	icon: UserIcon,
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Nome",
			type: "string",
			validation: (rule) => rule.required(),
		}),
	],
});
