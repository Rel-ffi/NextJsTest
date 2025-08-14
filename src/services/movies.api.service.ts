import {axiosInstance} from "./axiosInstance";
import type {IGenre, IMovie, ITrailer} from "@/types/movie.types";


export const getMoviesGenre = (page = 1, genreParam: string) =>
    axiosInstance.get<{ page: number; results: IMovie[]; total_pages: number; total_results: number; }>(
        `/discover/movie?page=${page}${genreParam}?include_adult=true`
    );

export const getGenres = () =>
    axiosInstance.get<{ genres: IGenre[] }>("/genre/movie/list");

export const getMovieById = (id: number) =>
    axiosInstance.get<IMovie>(`/movie/${id}`);

export const searchMovies = (query: string, page = 1) =>
    axiosInstance.get<{ page: number; results: IMovie[]; total_pages: number; total_results: number; }>(
        `/search/movie?query=${query}&page=${page}`
    );

export const getMovieVideo = (movieId: number) =>
    axiosInstance.get<{ id: number; results: ITrailer[] }>(`/movie/${movieId}/videos?append_to_response=videos`);