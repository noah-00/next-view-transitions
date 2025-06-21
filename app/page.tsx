import { FeaturedMovie } from "../components/FeaturedMovie";
import { Header } from "../components/Header";
import { MovieRow } from "../components/MovieRow";
import { getPopularMovies } from "../utils/tmdb";

export default async function Home() {
	const featuredMovie = await getPopularMovies();

	return (
		<div className="min-h-screen bg-black">
			<Header />
			<FeaturedMovie movie={featuredMovie[0]} />
			<div className="space-y-8">
				<MovieRow title="Popular Movies" movies={featuredMovie} />
				<MovieRow title="Trending Now" movies={featuredMovie} />
				<MovieRow title="Action Movies" movies={featuredMovie} />
			</div>
		</div>
	);
}
