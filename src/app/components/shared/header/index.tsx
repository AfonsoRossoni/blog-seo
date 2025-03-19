import { clsx } from "clsx";
import st from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	return (
		<header className={st.header}>
			<div
				className={clsx(
					st.container,
					"flex justify-between items-center container mx-auto py-10",
				)}
			>
				<Link href="/">
					<Image src="/logo.svg" alt="Konsi Blog Logo" width={139} height={50} />
				</Link>
				<nav className={clsx(st.nav, "flex")} aria-label="Navegação principal">
					<Link href="/" className={st.navItem}>
						Home
					</Link>
					<button className={st.navItem} aria-label="Visualizar categorias">
						Categorias
						<Image
							className={st.arrow}
							src="/arrow-down.svg"
							alt=""
							width={24}
							height={24}
						/>
					</button>
					<Link href="/categoria/noticias" className={st.navItem}>
						Notícias
					</Link>
				</nav>
				<button className={st.search} aria-label="Procurar no site">
					<Image src="/search.svg" alt="" width={24} height={24} />
					Buscar
				</button>
			</div>
		</header>
	);
}
