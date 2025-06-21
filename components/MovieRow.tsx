import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../types/movie";
import { getImageUrl } from "../utils/tmdb";

interface MovieRowProps {
	title: string;
	movies: Movie[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
	return (
		<div className="px-8 mb-8">
			<h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
			<div className="flex gap-4 overflow-x-auto scrollbar-hide">
				{movies.map((movie) => (
					<Link
						key={movie.id}
						href={`/movie/${movie.id}`}
						className="flex-shrink-0 w-48 group"
					>
						<div className="relative h-72 rounded-lg overflow-hidden">
							<Image
								src={getImageUrl(movie.poster_path, "w500")}
								alt={movie.title}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
						</div>
						<h3 className="text-white mt-2 text-sm font-medium line-clamp-2">
							{movie.title}
						</h3>
					</Link>
				))}
			</div>
		</div>
	);
}
