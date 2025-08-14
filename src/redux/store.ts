import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import genresReducer from "../features/genres/genresSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        genres: genresReducer,
        favorites: favoritesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
