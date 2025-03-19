"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import st from "./index.module.scss";
import ImageWrapper from "../imageWrapper";
import DateComponent from "../date";
import Arrow from "../arrow";
import { clsx } from "clsx";
import { PostQueryResult } from "@/sanity.types";
import Link from "next/link";

interface ResponsiveCarouselProps {
	posts: PostQueryResult[];
}

export default function ResponsiveCarousel({ posts }: ResponsiveCarouselProps) {
	if (posts?.length === 0) return;
	return (
		<div role="region" aria-roledescription="carousel" aria-label="Últimas notícias">
			<Carousel
				className={st.carousel}
				showArrows={true}
				showIndicators={false}
				showStatus={false}
				infiniteLoop={false}
				dynamicHeight={false}
				showThumbs={false}
				centerMode={true}
				centerSlidePercentage={60}
				renderArrowPrev={(onClickHandler, hasPrev, label) =>
					hasPrev && (
						<button
							type="button"
							onClick={onClickHandler}
							title={label}
							className={st.arrow}
							aria-label="Ver slide anterior"
						>
							<Arrow direction="left" />
						</button>
					)
				}
				renderArrowNext={(onClickHandler, hasNext, label) =>
					hasNext && (
						<button
							type="button"
							onClick={onClickHandler}
							title={label}
							className={clsx(st.arrow, st.nextArrow)}
							aria-label="Ver próximo slide"
						>
							<Arrow direction="right" />
						</button>
					)
				}
			>
				{posts.map((item) => (
					<Link
						href={`/posts/${item?.slug}`}
						key={item?._id}
						className="block"
						aria-label={`Ler artigo: ${item?.title}`}
						aria-roledescription="slide"
						role="group"
					>
						<ImageWrapper image={item?.coverImage} width={545} />
						<div className={st.content}>
							{item?.category && (
								<p
									className="category body-2"
									aria-label={`Categoria: ${item?.category.title}`}
								>
									{item?.category.title}
								</p>
							)}
							<h3 className={st.title}>{item?.title}</h3>
							<div className="flex items-center gap-1">
								{item?.author && (
									<p className="body-2">Por {item.author.name} | </p>
								)}
								{item?.date && (
									<p className="body-2">
										Publicado em{" "}
										<DateComponent
											dateString={item.date}
											ariaLabel={`Data de publicação do artigo: ${item?.title}`}
										/>
									</p>
								)}
							</div>
						</div>
					</Link>
				))}
			</Carousel>
		</div>
	);
}
