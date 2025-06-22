import { FeaturedMovie } from "../components/FeaturedMovie";
import { Header } from "../components/Header";
import { MovieRow } from "../components/MovieRow";
import { getPopularMovies } from "../utils/anilist";

export default async function Home() {
	const movies = await getPopularMovies();
	const featuredMovie = movies[5];

	if (!featuredMovie) {
		return null;
	}

	return (
		<div>
			<Header />
			<main>
				<FeaturedMovie movie={featuredMovie} />
				<div className="fixed bottom-0 left-0 right-0 px-8 pb-4 bg-gradient-to-t from-black to-transparent">
					<MovieRow title="Your Next Watch" movies={movies} />
				</div>
			</main>
		</div>
	);
}
