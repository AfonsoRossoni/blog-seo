import { Image } from "next-sanity/image";
import { urlForImage } from "@utils/general";
import st from "./index.module.scss";
import { clsx } from "clsx";

interface ImageWrapperProps {
	image: any;
	width?: number;
	height?: number;
	priority?: boolean;
	fixedSize?: boolean;
	animate?: boolean;
}

export default function ImageWrapper(props: ImageWrapperProps) {
	const { image: source, priority, fixedSize, width, height, animate = true } = props;

	// Calculate aspect ratio for better CLS
	const aspectRatio = width && height ? width / height : 16 / 9;
	const calculatedWidth = width || 2000;
	const calculatedHeight = height || Math.round(calculatedWidth / aspectRatio);

	return (
		<div
			className={clsx(st.imageWrapper, fixedSize && st.fixedSize, animate && st.animate)}
			style={
				{
					"--aspect-ratio": aspectRatio,
					width: fixedSize ? `${width}px` : "100%",
					height: fixedSize ? `${height}px` : "auto",
				} as React.CSSProperties
			}
		>
			<Image
				className={clsx(st.image)}
				width={calculatedWidth}
				height={calculatedHeight}
				alt={source.alt || ""}
				src={
					urlForImage(source)
						?.height(calculatedHeight)
						.width(calculatedWidth)
						.url() as string
				}
				sizes={
					fixedSize
						? `${width}px`
						: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
				}
				priority={priority}
				quality={90}
				loading={priority ? "eager" : "lazy"}
				placeholder="blur"
				blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiS0hLPVBVW1xbOEVJW1L/2wBDARUXFx4aHjshITtLQktLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
			/>
		</div>
	);
}
