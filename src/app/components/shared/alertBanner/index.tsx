"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore, useTransition } from "react";
import { disableDraftMode } from "@sanity/lib/actions";

const emptySubscribe = () => () => {};

export default function AlertBanner() {
	const router = useRouter();
	const [pending, startTransition] = useTransition();

	const shouldShow = useSyncExternalStore(
		emptySubscribe,
		() => window.top === window,
		() => false,
	);

	if (!shouldShow) return null;

	return (
		<div
			className={`${
				pending ? "animate-pulse" : ""
			} fixed top-0 left-0 z-50 w-full border-b bg-white/95 backdrop-blur`}
		>
			<div className="py-2 text-center text-sm">
				{pending ? (
					"Desativando o modo rascunho..."
				) : (
					<>
						{"Pré-visualização de rascunho ativa. "}
						<button
							type="button"
							onClick={() =>
								startTransition(() =>
									disableDraftMode().then(() => {
										router.refresh();
									}),
								)
							}
							className="hover:text-cyan underline transition-colors duration-200"
						>
							Voltar para versão publicada
						</button>
					</>
				)}
			</div>
		</div>
	);
}
