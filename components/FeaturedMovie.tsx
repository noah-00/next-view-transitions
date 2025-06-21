import { Info, Play } from "lucide-react";
import Image from "next/image";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../utils/tmdb";

interface FeaturedMovieProps {
	movie: Movie;
}

export function FeaturedMovie({ movie }: FeaturedMovieProps) {
	return (
		<div className="relative h-screen">
			<div className="absolute inset-0">
				<Image
					src={getImageUrl(movie.backdrop_path)}
					alt={movie.title}
					fill
					className="object-cover"
					sizes="100vw"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
			</div>

			<div className="relative pt-48 px-8 max-w-2xl">
				<h1 className="text-6xl font-bold text-white mb-4">{movie.title}</h1>
				<div className="flex items-center gap-4 text-sm text-white/80 mb-6">
					<span>{new Date(movie.release_date).getFullYear()}</span>
					<span className="px-2 py-1 bg-white/20 rounded">
						{Math.round(movie.vote_average * 10)}% Match
					</span>
				</div>
				<p className="text-lg text-white/90 mb-8">{movie.overview}</p>
				<div className="flex items-center gap-4">
					<button
						type="button"
						className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition"
					>
						<Play size={24} />
						Play
					</button>
					<button
						type="button"
						className="flex items-center gap-2 px-8 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition"
					>
						<Info size={24} />
						More Info
					</button>
				</div>
			</div>
		</div>
	);
}
