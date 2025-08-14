"use client";

import "./MoviesCard.css";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {addFavorite, removeFavorite} from "@/features/favorites/favoritesSlice";
import type {IMovie} from "@/types/movie.types";
import * as React from "react";

interface MovieCardProps {
    movie: IMovie;
}

const MovieCardComponent = ({ movie }: MovieCardProps) => {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.movies);

    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFavorite(movie.id));
        } else {
            dispatch(addFavorite(movie));
        }
    };

    return (
        <div
            className="movie-card"
            onClick={() => router.push(`/movie/${movie.id}`)}
        >
            <div className="poster-wrapper">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                />
                <div className="overlay">
                    <button className="details-btn">Details</button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">
                    {movie.title.length > 20 ? movie.title.slice(0, 20) + "..." : movie.title}
                </h3>
                <div className="movie-meta">
                    <span className="rating">⭐ {movie.vote_average}</span>
                    <span className="release-date">{movie.release_date}</span>
                    <button
                        className={`mc-like-button ${isFavorite ? "liked" : ""}`}
                        onClick={toggleFavorite}
                    >
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCardComponent;
