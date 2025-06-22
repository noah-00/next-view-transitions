import Image from "next/image";
import { BackButton } from "../../../components/BackButton";
import { RatingIndicator } from "../../../components/RatingIndicator";
import { getBestCoverImage, getMovieById } from "../../../utils/anilist";

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
					<h1 className="text-4xl font-bold mb-4">Anime Not Found</h1>
					<BackButton href="/" />
				</div>
			</div>
		);
	}

	const title = movie.title.english || movie.title.romaji;
	const description = movie.description?.replace(/<[^>]*>/g, "") || "";
	const backgroundImage =
		movie.bannerImage || getBestCoverImage(movie.coverImage);
	const isBannerImage = !!movie.bannerImage;
	const posterImage = getBestCoverImage(movie.coverImage);

	return (
		<div className="min-h-screen bg-black text-white">
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
									src={posterImage}
									alt={title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 50vw, 256px"
								/>
							</div>

							<div className="flex-1">
								<div className="flex items-start gap-4 mb-4">
									<h1 className="text-6xl font-bold text-white flex-1">
										{title}
									</h1>
								</div>
								<p className="text-lg text-white/70 mb-8 font-semibold">
									{description}
								</p>

								<div className="mb-8">
									<h2 className="text-lg font-semibold text-white mb-4">
										CHARACTERS
									</h2>
									<div className="grid grid-cols-3 gap-4">
										{movie.characters?.edges
											?.slice(0, 6)
											.map((characterEdge) => (
												<div key={characterEdge.id} className="text-white/80">
													<p className="font-semibold">
														{characterEdge.node.name.full}
													</p>
													<p className="text-sm text-white/60">
														{characterEdge.voiceActors?.[0]?.name?.full ||
															"Voice Actor"}
													</p>
												</div>
											))}
									</div>
								</div>

								<div>
									<h2 className="text-lg font-semibold text-white mb-8">
										RATINGS
									</h2>
									<div className="flex gap-8">
										<div className="flex items-center gap-2 relative">
											<RatingIndicator
												rating={movie.averageScore / 10}
												size="md"
												className="absolute"
											/>
											<span className="text-white/80 font-semibold pl-20">
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
