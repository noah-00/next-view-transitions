import Image from "next/image";
import { BackButton } from "../../../components/BackButton";
import { RatingIndicator } from "../../../components/RatingIndicator";
import { getImageUrl, getMovieById } from "../../../utils/tmdb";

interface MoviePageProps {
	params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
	const { id } = await params;

	const movie = await getMovieById(id);

	if (!movie) {
		return (
			<div className="min-h-screen bg-black text-white flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
					<BackButton href="/" />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-black text-white">
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

				<div className="relative h-full flex flex-col">
					<div className="absolute top-8 left-8 z-10">
						<BackButton href="/" />
					</div>

					<div className="flex-1 flex items-center justify-center px-8">
						<div
							className="flex gap-8 w-full max-w-6xl"
							style={{ viewTransitionName: "movie-details" }}
						>
							<div className="relative w-64 h-96 rounded-lg overflow-hidden flex-shrink-0">
								<Image
									src={getImageUrl(movie.poster_path, "w500")}
									alt={movie.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 50vw, 256px"
								/>
							</div>

							<div className="flex-1">
								<div className="flex items-start gap-4 mb-4">
									<h1 className="text-6xl font-bold text-white flex-1">
										{movie.title}
									</h1>
								</div>
								<p className="text-lg text-white/80 mb-8">{movie.overview}</p>

								<div className="mb-8">
									<h2 className="text-lg font-semibold text-white/60 mb-4">
										CAST
									</h2>
									<div className="grid grid-cols-3 gap-4">
										{movie.credits.cast.slice(0, 6).map((actor) => (
											<div key={actor.id} className="text-white/80">
												<p className="font-medium">{actor.name}</p>
												<p className="text-sm text-white/60">
													{actor.character}
												</p>
											</div>
										))}
									</div>
								</div>

								<div>
									<h2 className="text-lg font-semibold text-white/60 mb-8">
										RATINGS
									</h2>
									<div className="flex gap-8">
										<div className="flex items-center gap-2 relative">
											<RatingIndicator
												rating={movie.vote_average}
												size="md"
												className="absolute"
											/>
											<span className="text-white/90 font-medium pl-20">
												User Rating
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
