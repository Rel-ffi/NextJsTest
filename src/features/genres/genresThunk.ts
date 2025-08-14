import {createAsyncThunk} from "@reduxjs/toolkit";
import {getGenres} from "@/services/movies.api.service";

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
    const response = await getGenres();
    return response.data.genres;
});
