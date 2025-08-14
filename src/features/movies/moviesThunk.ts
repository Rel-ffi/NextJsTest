import {createAsyncThunk} from "@reduxjs/toolkit";
import {getMovieById, getMoviesGenre, searchMovies} from "@/services/movies.api.service";
import type {IMovie} from "@/types/movie.types";

interface FetchMoviesParams {
    page?: number;
    genreId?: number | null;
}

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (params: FetchMoviesParams = { page: 1, genreId: null }): Promise<{ movies: IMovie[]; totalPages: number }> => {
        const { page = 1, genreId = null } = params;
        const genreParam = genreId ? `&with_genres=${genreId}` : "";
        const response = await getMoviesGenre(page, genreParam);

        const filteredMovies = response.data.results.filter(
            (movie: IMovie) => movie.poster_path && movie.backdrop_path
        );

        return {
            movies: filteredMovies,
            totalPages: response.data.total_pages,
        };
    }
);

export const fetchSearchedMovies = createAsyncThunk(
    "movies/fetchSearchedMovies",
    async (params: { query: string; page?: number }): Promise<{ movies: IMovie[]; totalPages: number }> => {
        const { query, page = 1 } = params;
        const response = await searchMovies(query, page);

        const filteredMovies = response.data.results.filter(
            (movie: IMovie) => movie.poster_path && movie.backdrop_path
        );

        return {
            movies: filteredMovies,
            totalPages: response.data.total_pages,
        };
    }
);


export const fetchMovieDetails = createAsyncThunk(
    "movies/fetchMovieDetails",
    async (movieId: number): Promise<IMovie> => {
        const response = await getMovieById(movieId);
        return response.data;
    }
);
