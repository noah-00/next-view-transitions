export interface Anime {
	id: number;
	title: {
		romaji: string;
		english?: string;
		native: string;
	};
	description: string;
	coverImage: {
		large: string;
		extraLarge?: string;
		medium: string;
	};
	bannerImage?: string;
	startDate: {
		year: number;
		month: number;
		day: number;
	};
	averageScore: number;
	genres: string[];
	format: string;
	status: string;
}

export interface AnimeResponse {
	data: {
		Page: {
			media: Anime[];
		};
	};
}

export interface Character {
	id: number;
	name: {
		full: string;
	};
	image: {
		medium: string;
	};
}

export interface Voice {
	id: number;
	name: {
		full: string;
	};
	image: {
		medium: string;
	};
	language: string;
}

export interface CharacterEdge {
	id: number;
	node: Character;
	voiceActors: Voice[];
	role: string;
}

export interface AnimeDetail extends Anime {
	characters: {
		edges: CharacterEdge[];
	};
	externalLinks: Array<{
		url: string;
		site: string;
	}>;
}
