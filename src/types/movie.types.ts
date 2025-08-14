export interface IGenre {
    id: number;
    name: string;
}

export interface IMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
    genre_ids?: number[];
    genres: IGenre[];
    runtime?: number;
    tagline?: string;
    videos?: {
        results: ITrailer[];
    };
}

export interface ITrailer {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}
