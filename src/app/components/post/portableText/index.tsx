import { PortableText, type PortableTextComponents, type PortableTextBlock } from "next-sanity";

interface CustomPortableTextProps {
	className?: string;
	value: PortableTextBlock[];
}

export default function CustomPortableText({ className, value }: CustomPortableTextProps) {
	const components: PortableTextComponents = {
		marks: {
			link: ({ children, value }) => {
				const href = value?.href;
				if (!href) return null;

				const isExternal = href.startsWith("http");
				return (
					<a
						href={href}
						rel={isExternal ? "noreferrer noopener" : undefined}
						target={isExternal ? "_blank" : undefined}
						aria-label={`Link para ${isExternal ? "site externo" : "página interna"}: ${children}`}
					>
						{children}
					</a>
				);
			},
		},
	};

	return (
		<div
			className={["body-1", className].filter(Boolean).join(" ")}
			role="article"
			aria-label="Conteúdo do artigo"
		>
			<PortableText components={components} value={value} />
		</div>
	);
}
