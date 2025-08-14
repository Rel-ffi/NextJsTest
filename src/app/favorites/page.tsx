"use client"

import "./FavoritesPage.css"
import MoviesGridComponent from "@/components/MoviesGrid/MoviesGridComponent";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";

export default function FavoritesPage () {
    const movies = useSelector((state: RootState) => state.favorites.movies);


    if (movies.length === 0) {
        return <p>No liked film&apos;s yet:(</p>;
    }

    return (
        <div className="favorites-page-wrapper">
            <h2>Favorite&apos;s films</h2>
            <MoviesGridComponent movies={movies} />
        </div>
    );
};
