import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous")},
  "category": category->{
    "title": coalesce(title, "Uncategorized"),
    "slug": coalesce(slug.current, "uncategorized")
  },
  "tag": tag->{
    "title": title,
    "slug": slug.current,
    "icon": icon
  }
`;

const genericFields = `
  _id,
  name,
  description,
  title,
  icon,
  "slug": slug.current,
`;

export const postsQuery = defineQuery(`
  {
    "posts": *[_type == "post" && defined(slug.current)] | order($order desc) [0...$limit] {
      content,
      ${postFields}
    }
  }
`);

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order($order desc) [0...5] {
    ${genericFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

export const postsByCategorySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug] {
    ${genericFields}
    "posts": *[_type == "post" && references(^._id)] | order($order desc, _updatedAt desc) [0...5] {
      content,
      ${postFields}
    }
  }[0]
`);

export const postsByTagSlugQuery = defineQuery(`
  *[_type == "tag" && slug.current == $slug] {
    ${genericFields}
    "posts": *[_type == "post" && references(^._id)] | order($order desc, _updatedAt desc) [0...4] {
      content,
      ${postFields}
    }
  }[0]
`);

export const allPostsUrlsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "url": "/" + slug.current,
    "lastModified": coalesce(_updatedAt, _createdAt)
  }
`);

export const categoryDataBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    title,
    "slug": slug.current
  }
`);

export const tagDataBySlugQuery = defineQuery(`
  *[_type == "tag" && slug.current == $slug][0]{
    title,
    "slug": slug.current
  }
`);

export const postDataBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "category": category->{
      title,
      "slug": slug.current
    }
  }
`);

export const postSlugs = defineQuery(
	`*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);

export const categorySlugs = defineQuery(
	`*[_type == "category" && defined(slug.current)]{"slug": slug.current}`,
);

export const tagSlugs = defineQuery(
	`*[_type == "tag" && defined(slug.current)]{"slug": slug.current}`,
);
