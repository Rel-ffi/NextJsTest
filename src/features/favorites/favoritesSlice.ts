import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IMovie} from "@/types/movie.types";

const loadFavorites = (): IMovie[] => {
    try {
        const data = localStorage.getItem("favorites");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error:Can't download favorite's film:", error);
        return [];
    }
};

const saveFavorites = (favorites: IMovie[]) => {
    try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
        console.error("Failed to save film to favorite's:", error);
    }
};

interface FavoritesState {
    movies: IMovie[];
}

const initialState: FavoritesState = {
    movies: loadFavorites(),
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<IMovie>) {
            const existingMovie = state.movies.find((m) => m.id === action.payload.id);
            if (!existingMovie) {
                state.movies.push(action.payload);
                saveFavorites(state.movies);
            }
        },
        removeFavorite(state, action: PayloadAction<number>) {
            state.movies = state.movies.filter((m) => m.id !== action.payload);
            saveFavorites(state.movies);
        },
    },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
