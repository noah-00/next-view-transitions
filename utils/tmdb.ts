import type { MovieDetail, MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const headers = {
	Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
	"Content-Type": "application/json",
};

export const getPopularMovies = async () => {
	const response = await fetch(
		`${BASE_URL}/movie/popular?language=en-US&page=1`,
		{
			headers,
		},
	);
	if (!response.ok) {
		throw new Error(`Failed to fetch popular movies: ${response.status}`);
	}

	const data = (await response.json()) as MovieResponse;
	return data.results;
};

export const getMovieById = async (id: string) => {
	const response = await fetch(
		`${BASE_URL}/movie/${id}?append_to_response=credits`,
		{
			headers,
		},
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch movie with id ${id}: ${response.status}`);
	}

	return (await response.json()) as MovieDetail;
};

export const getImageUrl = (
	path: string,
	size: "original" | "w500" = "original",
) => {
	return `${IMAGE_BASE_URL}/${size}${path}`;
};
