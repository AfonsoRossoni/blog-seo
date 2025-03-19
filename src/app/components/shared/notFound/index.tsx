import Link from "next/link";
import st from "./index.module.scss";

interface NotFoundComponentProps {
	title: string;
	description: string;
}

export default function NotFoundComponent({ title, description }: NotFoundComponentProps) {
	return (
		<main className={st.notFound} role="main" aria-labelledby="not-found-title">
			<h1 id="not-found-title">{title}</h1>
			<p aria-label="Descrição do erro">{description}</p>
			<Link href="/">
				<button className={st.button} aria-label="Voltar para a página inicial">
					Ir para a home
				</button>
			</Link>
		</main>
	);
}
