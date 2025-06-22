import type { AnimeDetail, AnimeResponse } from "../types/movie";

const ANILIST_API_URL = "https://graphql.anilist.co";

const GET_POPULAR_ANIME_QUERY = `
query {
  Page(page: 1, perPage: 20) {
    media(type: ANIME, sort: POPULARITY_DESC, format: MOVIE) {
      id
      title {
        romaji
        english
        native
      }
      description
      coverImage {
        extraLarge
        large
        medium
      }
      bannerImage
      startDate {
        year
        month
        day
      }
      averageScore
      genres
      format
      status
    }
  }
}
`;

const GET_ANIME_BY_ID_QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    description
    coverImage {
      extraLarge
      large
      medium
    }
    bannerImage
    startDate {
      year
      month
      day
    }
    averageScore
    genres
    format
    status
    characters(sort: [ROLE, RELEVANCE], perPage: 6) {
      edges {
        id
        node {
          id
          name {
            full
          }
          image {
            medium
          }
        }
        voiceActors(language: JAPANESE, sort: [RELEVANCE]) {
          id
          name {
            full
          }
          image {
            medium
          }
          language
        }
        role
      }
    }
    externalLinks {
      url
      site
    }
  }
}
`;

export const getPopularMovies = async () => {
	const response = await fetch(ANILIST_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: GET_POPULAR_ANIME_QUERY,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch popular anime: ${response.status}`);
	}

	const data = (await response.json()) as AnimeResponse;
	return data.data.Page.media;
};

export const getMovieById = async (id: string) => {
	const response = await fetch(ANILIST_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: GET_ANIME_BY_ID_QUERY,
			variables: { id: parseInt(id) },
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch anime with id ${id}: ${response.status}`);
	}

	const data = await response.json();
	return data.data.Media as AnimeDetail;
};

export const getBestCoverImage = (coverImage: {
	extraLarge?: string;
	large: string;
	medium: string;
}) => {
	return coverImage.extraLarge || coverImage.large;
};
