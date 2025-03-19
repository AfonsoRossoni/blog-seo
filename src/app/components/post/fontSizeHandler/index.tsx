"use client";

import st from "./index.module.scss";

export default function FontSizeHandler() {
	function handleFontSize(sign: "+" | "-") {
		const root = document.querySelector(":root");
		if (!root) return;
		const rs = getComputedStyle(root);
		const currentFontSize = Number(rs.getPropertyValue("--body-1").replace("px", ""));
		(root as HTMLElement)?.style.setProperty(
			"--body-1",
			currentFontSize + 2 * (sign === "+" ? 1 : -1) + "px",
		);
	}

	return (
		<div className={st.fontSizeHandler}>
			<button
				type="button"
				aria-label="Diminuir tamanho da fonte"
				onClick={() => handleFontSize("-")}
				className={st.button}
			>
				A -
			</button>
			<button
				type="button"
				aria-label="Aumentar tamanho da fonte"
				onClick={() => handleFontSize("+")}
				className={st.button}
			>
				A +
			</button>
		</div>
	);
}
