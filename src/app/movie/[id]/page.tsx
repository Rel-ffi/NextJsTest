"use client"

import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchMovieDetails} from "@/features/movies/moviesThunk";
import {useParams} from "next/navigation";
import MovieDetailsComponent from "@/components/MovieDetailsComponent/MovieDetailsComponent";

const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { movieDetails, loading, error } = useAppSelector((state) => state.movies);
    useEffect(() => {
        if (id) {
            dispatch(fetchMovieDetails(Number(id)));
        }
    }, [dispatch, id]);

    return (
        <MovieDetailsComponent
            movieDetails={movieDetails}
            loading={loading}
            error={error}
        />
    );
};

export default MovieDetailsPage;

