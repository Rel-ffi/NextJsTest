"use client";

import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchMovies} from "@/features/movies/moviesThunk";
import type {RootState} from "@/redux/store";
import FeaturedMovieComponent from "../components/FeaturedMovie/FeaturedMovieComponent";
import MoviesGridComponent from "../components/MoviesGrid/MoviesGridComponent";
import PaginationComponent from "../components/Pagination/PaginationComponent";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { movies, featured, loading } = useAppSelector(
      (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  return (
      <div className="mp-container">
        {loading && <p>Loading...</p>}
        {featured && <FeaturedMovieComponent movie={featured} />}
        <MoviesGridComponent movies={movies} />
        <PaginationComponent />
      </div>
  );
}
