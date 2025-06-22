"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../utils/tmdb";
import { RatingIndicator } from "./RatingIndicator";

interface MovieRowProps {
	title: string;
	movies: Movie[];
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

		const currentRow = rowRef.current;
		currentRow?.addEventListener("scroll", handleScroll);

		return () => {
			currentRow?.removeEventListener("scroll", handleScroll);
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
					className="absolute left-2 top-[calc(50%+32px)] -translate-y-1/2 z-40 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
					onClick={() => scroll("left")}
				>
					<ChevronLeft className="w-6 h-6 text-white" />
				</button>

				<div
					ref={rowRef}
					className="flex gap-3 overflow-x-scroll scrollbar-hide scroll-smooth py-4"
				>
					{movies.map((movie) => (
						<Link
							key={movie.id}
							href={`/movie/${movie.id}`}
							className="flex-none w-80 group transition-transform hover:scale-105"
						>
							<h3 className="text-white mb-2 text-base line-clamp-2 text-center font-semibold">
								{movie.title}
							</h3>
							<div className="relative w-full aspect-video rounded-lg overflow-hidden">
								<Image
									src={getImageUrl(movie.backdrop_path, "w780")}
									alt={movie.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
								<RatingIndicator
									rating={movie.vote_average}
									className="absolute bottom-2 right-2"
								/>
							</div>
						</Link>
					))}
				</div>
				<button
					type="button"
					className="absolute right-2 top-[calc(50%+32px)] -translate-y-1/2 z-40 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
					onClick={() => scroll("right")}
				>
					<ChevronRight className="w-6 h-6 text-white" />
				</button>
			</div>
		</div>
	);
}
