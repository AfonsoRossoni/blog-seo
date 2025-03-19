"use client";

import Image from "next/image";
import st from "./index.module.scss";
import { useState } from "react";

export default function ThemeSwitch() {
	const [theme, setTheme] = useState<string>("light");

	function toggleTheme() {
		const root = document.documentElement;
		const newTheme = theme === "dark" ? "light" : "dark";
		root.setAttribute("data-theme", newTheme);
		setTheme(newTheme);
	}

	return (
		<div className={st.themeSwitch}>
			<button
				type="button"
				aria-label="Trocar tema"
				onClick={() => toggleTheme()}
				className={st.button}
			>
				<Image
					src={theme === "dark" ? "/light.svg" : "/dark.svg"}
					alt="Trocar tema"
					width={24}
					height={24}
				/>
			</button>
		</div>
	);
}
