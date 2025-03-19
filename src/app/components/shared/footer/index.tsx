import Link from "next/link";
import st from "./index.module.scss";
import Image from "next/image";
import Arrow from "../arrow";

export default function Footer() {
	return (
		<footer className={st.footer}>
			<div className="container mx-auto px-5 flex justify-between items-start">
				<div className={st.info}>
					<Image src="/logo.svg" alt="logo" className={st.logo} width={170} height={60} />
					<p>
						© 2025 SINKO. <br />
						Todos os direitos reservados.
					</p>
					<div className={st.socials}>
						<Link href="/" target="_blank" rel="noreferrer">
							<Image src="/whatsapp.svg" alt="whatsapp" width={39} height={39} />
						</Link>
						<Link href="/" target="_blank" rel="noreferrer">
							<Image src="/linkedin.svg" alt="linkedin" width={39} height={39} />
						</Link>
						<Link href="/" target="_blank" rel="noreferrer">
							<Image src="/instagram.svg" alt="instagram" width={39} height={39} />
						</Link>
						<Link href="/" target="_blank" rel="noreferrer">
							<Image src="/facebook.svg" alt="facebook" width={39} height={39} />
						</Link>
						<Link href="/" target="_blank" rel="noreferrer">
							<Image src="/x.svg" alt="x" width={39} height={39} />
						</Link>
						<Link href="/" target="_blank" rel="noreferrer">
							<Image src="/youtube.svg" alt="youtube" width={39} height={39} />
						</Link>
					</div>
				</div>
				<div className={st.explore}>
					<h3 className={st.title}>Explore</h3>
					<nav className={st.nav}>
						<Link href="/">Home</Link>
						<Link href="/categoria/noticias">Notícias</Link>
						<Link href="/">Nossos produtos</Link>
					</nav>
				</div>
				<div className={st.about}>
					<h3 className={st.title}>SINKO</h3>
					<nav className={st.nav}>
						<Link href="/">Sobre Nós</Link>
						<Link href="/">Termos de uso</Link>
						<Link href="/">Política de privacidade</Link>
						<Link href="/">Contato</Link>
						<Link href="/">Nossa equipe</Link>
					</nav>
				</div>
				<div className={st.scroller}>
					<div className={st.arrow}>
						<Arrow direction="up" size={16} />
					</div>
					<p>Voltar ao topo</p>
				</div>
			</div>
		</footer>
	);
}
