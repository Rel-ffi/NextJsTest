'use client'

import "./Topbar.css";
import * as React from "react";
import {useEffect} from "react";
import type {RootState} from "@/redux/store";
import {fetchGenres} from "@/features/genres/genresThunk";
import {setActiveGenre} from "@/features/genres/genresSlice";
import {fetchMovies, fetchSearchedMovies} from "@/features/movies/moviesThunk";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {resetSearch, setSearchQuery} from "@/features/movies/moviesSlice";
import type {IGenre} from "@/types/movie.types";

const TopbarComponent = () => {
    const dispatch = useAppDispatch();
    const { genres, activeGenre } = useAppSelector((state: RootState) => state.genres);
    const searchQuery = useAppSelector((state: RootState) => state.movies.searchQuery);

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const handleGenreClick = (genreId: number | null) => {
        dispatch(setSearchQuery(""));
        dispatch(resetSearch());
        dispatch(setActiveGenre(genreId));
        dispatch(fetchMovies({ page: 1, genreId }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setSearchQuery(value));

        if (value.trim().length > 0) {
            dispatch(fetchSearchedMovies({ query: value, page: 1 }));
        } else {
            dispatch(resetSearch());
            dispatch(fetchMovies({ page: 1, genreId: activeGenre }));
        }
    };

    return (
        <header className="tb-topbar">
            <input
                type="text"
                className="tb-search-input"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="tb-genres">
                <span
                    className={`tb-genre-item ${activeGenre === null ? "active" : ""}`}
                    onClick={() => handleGenreClick(null)}
                >
                    All
                </span>
                {genres.map((genre: IGenre) => (
                    <span
                        key={genre.id}
                        className={`tb-genre-item ${activeGenre === genre.id ? "active" : ""}`}
                        onClick={() => handleGenreClick(genre.id)}
                    >
                        {genre.name}
                    </span>
                ))}
            </div>
        </header>
    );
};

export default TopbarComponent;
