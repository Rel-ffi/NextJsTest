import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {fetchMovieDetails, fetchMovies, fetchSearchedMovies} from ".//moviesThunk";
import type {IMovie} from "@/types/movie.types";

interface MoviesState {
    movies: IMovie[];
    movieDetails: IMovie | null;
    featured: IMovie | null;
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    isSearching: boolean;
    searchQuery: string;
}

const initialState: MoviesState = {
    movies: [],
    movieDetails: null,
    featured: null,
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    isSearching: false,
    searchQuery: ""
};

const handleMoviesFulfilled = (state: MoviesState, action: PayloadAction<{ movies: IMovie[]; totalPages: number }>) => {
    state.loading = false;
    state.movies = action.payload.movies;
    state.featured = action.payload.movies.length > 0 ? action.payload.movies[0] : null;
    state.totalPages = action.payload.totalPages;
};

const moviesSlice = createSlice({
    name: "movies",
    initialState: initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        resetSearch(state) {
            state.isSearching = false;
            state.searchQuery = "";
            state.page = 1;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.isSearching = false;
            })
            .addCase(fetchMovies.fulfilled, handleMoviesFulfilled)
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;

            })
            .addCase(fetchSearchedMovies.pending, (state) => {
                state.loading = true;
                state.isSearching = true;
            })
            .addCase(fetchSearchedMovies.fulfilled, handleMoviesFulfilled)
            .addCase(fetchSearchedMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;
                state.movieDetails = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action: PayloadAction<IMovie>) => {
                state.loading = false;
                state.movieDetails = action.payload;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    }
});

export const { setPage, resetSearch, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
