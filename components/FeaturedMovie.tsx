import { Info, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Anime } from "../types/movie";
import { getBestCoverImage } from "../utils/anilist";
import { RatingIndicator } from "./RatingIndicator";

interface FeaturedMovieProps {
	movie: Anime;
}

export function FeaturedMovie({ movie }: FeaturedMovieProps) {
	const title = movie.title.english || movie.title.romaji;
	const year = movie.startDate?.year;
	const description = movie.description?.replace(/<[^>]*>/g, "") || "";

	const backgroundImage =
		movie.bannerImage || getBestCoverImage(movie.coverImage);
	const isBannerImage = !!movie.bannerImage;

	return (
		<div className="relative h-screen">
			<div className="absolute inset-0">
				<Image
					src={backgroundImage}
					alt={title}
					fill
					className={
						isBannerImage
							? "object-cover object-center"
							: "object-cover object-top"
					}
					sizes="100vw"
					priority
				/>
				<div className="absolute inset-0 bg-black/50" />
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
			</div>

			<div
				className="relative pt-28 px-8 max-w-2xl"
				style={{ viewTransitionName: "featured-details" }}
			>
				<h1 className="text-6xl font-bold text-white mb-4">{title}</h1>
				<div className="flex items-center gap-4 text-sm text-white/80 mb-6">
					{year && <span className="font-semibold text-white/80">{year}</span>}
					<div className="flex items-center gap-2 relative">
						<RatingIndicator
							rating={movie.averageScore / 10}
							size="sm"
							className="absolute"
						/>
						<span className="text-white/80 pl-12 font-semibold">
							User Rating
						</span>
					</div>
				</div>
				<p className="text-base text-white/80 mb-4 line-clamp-3 font-semibold">
					{description}
				</p>
				<div className="flex items-center gap-4">
					<button
						type="button"
						className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition cursor-pointer"
					>
						<Play size={24} />
						Play
					</button>
					<Link href={`/movie/${movie.id}`}>
						<button
							type="button"
							className="flex items-center gap-2 px-8 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition cursor-pointer"
						>
							<Info size={24} />
							More Info
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
