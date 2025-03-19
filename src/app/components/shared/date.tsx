import { format } from "date-fns";

interface DateComponentProps {
	dateString: string;
	ariaLabel?: string;
	itemProp?: string;
}

export default function DateComponent({ dateString, ariaLabel, itemProp }: DateComponentProps) {
	const formattedDate = format(new Date(dateString), "dd/MM/yyyy");
	return (
		<time
			className="body-2"
			dateTime={dateString}
			aria-label={ariaLabel || `Data de publicação: ${formattedDate}`}
			itemProp={itemProp}
		>
			{formattedDate}
		</time>
	);
}
