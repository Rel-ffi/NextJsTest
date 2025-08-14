import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {fetchGenres} from "./genresThunk";
import type {IGenre} from "@/types/movie.types";

interface GenresState {
    genres: IGenre[];
    activeGenre: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: GenresState = {
    genres: [],
    activeGenre: null,
    loading: false,
    error: null,
};

const genresSlice = createSlice({
    name: "genres",
    initialState: initialState,
    reducers: {
        setActiveGenre(state, action: PayloadAction<number | null>) {
            state.activeGenre = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Oops, error!";
            });
    },
});

export const { setActiveGenre } = genresSlice.actions;
export default genresSlice.reducer;
