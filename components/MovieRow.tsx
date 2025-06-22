"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Anime } from "../types/movie";
import { getBestCoverImage } from "../utils/anilist";
import { RatingIndicator } from "./RatingIndicator";

interface MovieRowProps {
	title: string;
	movies: Anime[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
	const rowRef = useRef<HTMLDivElement>(null);

	const storageKey = `movie-row-scroll-${title
		.replace(/\s+/g, "-")
		.toLowerCase()}`;

	useEffect(() => {
		if (rowRef.current && typeof window !== "undefined") {
			const savedScrollPosition = sessionStorage.getItem(storageKey);
			if (savedScrollPosition) {
				rowRef.current.scrollTo({
					left: parseInt(savedScrollPosition, 10),
					behavior: "instant",
				});
			}
		}

		const handleScroll = () => {
			if (rowRef.current) {
				sessionStorage.setItem(
					storageKey,
					rowRef.current.scrollLeft.toString(),
				);
			}
		};

		const handleWheel = (e: WheelEvent) => {
			if (rowRef.current) {
				if (e.deltaX !== 0) {
					return;
				}
				if (e.deltaY !== 0) {
					e.preventDefault();
					rowRef.current.scrollLeft += e.deltaY;
				}
			}
		};

		const currentRow = rowRef.current;
		currentRow?.addEventListener("scroll", handleScroll);
		currentRow?.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			currentRow?.removeEventListener("scroll", handleScroll);
			currentRow?.removeEventListener("wheel", handleWheel);
		};
	}, [storageKey]);

	const scroll = (direction: "left" | "right") => {
		if (rowRef.current) {
			const { scrollLeft, clientWidth } = rowRef.current;
			const scrollTo =
				direction === "left"
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth;
			rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
		}
	};

	return (
		<div className="relative" style={{ viewTransitionName: "movie-row" }}>
			<h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
			<div className="group relative">
				<button
					type="button"
					className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
					onClick={() => scroll("left")}
				>
					<ChevronLeft className="w-6 h-6 text-white" />
				</button>

				<div
					ref={rowRef}
					className="flex gap-4 overflow-x-scroll overflow-y-hidden scrollbar-hide scroll-smooth"
				>
					{movies.map((movie) => {
						const title = movie.title.english || movie.title.romaji;
						const coverImage = getBestCoverImage(movie.coverImage);

						return (
							<Link
								key={movie.id}
								href={`/movie/${movie.id}`}
								className="flex-none w-44 group transition-transform hover:scale-105"
							>
								<div className="relative">
									<Image
										src={coverImage}
										alt={title}
										width={192}
										height={288}
										className="w-full h-72 object-cover rounded-lg"
										sizes="192px"
									/>
									<RatingIndicator
										rating={movie.averageScore / 10}
										className="absolute bottom-2 right-2"
									/>
								</div>
								<h3 className="text-white mt-2 text-base line-clamp-2 text-center font-bold">
									{title}
								</h3>
							</Link>
						);
					})}
				</div>
				<button
					type="button"
					className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
					onClick={() => scroll("right")}
				>
					<ChevronRight className="w-6 h-6 text-white" />
				</button>
			</div>
		</div>
	);
}
