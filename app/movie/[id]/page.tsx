import Image from "next/image";
import { BackButton } from "../../../components/BackButton";
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

				<div className="relative p-8">
					<BackButton href="/" />
				</div>

				<div className="relative pt-32 px-8 max-w-4xl">
					<h1 className="text-6xl font-bold mb-6">{movie.title}</h1>
					<div className="flex items-center gap-4 text-lg text-white/80 mb-8">
						<span>{new Date(movie.release_date).getFullYear()}</span>
						<span className="px-3 py-1 bg-white/20 rounded">
							{Math.round(movie.vote_average * 10)}% Match
						</span>
					</div>
					<p className="text-xl text-white/90 mb-12 max-w-2xl">
						{movie.overview}
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">Cast</h3>
							<p className="text-white/80">Cast information would go here...</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold mb-4">Details</h3>
							<div className="space-y-2 text-white/80">
								<p>
									<span className="font-medium">Release Date:</span>{" "}
									{movie.release_date}
								</p>
								<p>
									<span className="font-medium">Rating:</span>{" "}
									{movie.vote_average}/10
								</p>
								<p>
									<span className="font-medium">Genre:</span> Action, Sci-Fi
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
