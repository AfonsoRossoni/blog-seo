type ArrowDirection = "left" | "right" | "up" | "down";
interface ArrowProps {
	direction: ArrowDirection;
	color?: string;
	size?: number;
	ariaLabel?: string;
}

export default function Arrow({ direction, color = "#fff", size = 26, ariaLabel }: ArrowProps) {
	const transform =
		direction === "left"
			? "rotate(180deg)"
			: direction === "up"
				? "rotate(-90deg)"
				: "rotate(0deg)";
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 26 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ transform }}
			aria-label={ariaLabel}
			role="img"
		>
			<path
				d="M13 0.84668L10.7843 3.06239L19.5528 11.8467L0.428553 11.8467V14.9895L19.5528 14.9895L10.7686 23.7581L13 25.9895L25.5714 13.4181L13 0.84668Z"
				fill={color}
			/>
		</svg>
	);
}
