import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {Manga, MangaSearch, SearchState} from "../../types/types";

export const fetchMangaByTitle = createAsyncThunk<
    Manga[],
    string,
    { rejectValue: string }
>(
    "manga/fetchMangaByTitle",
    async (title, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<MangaSearch> = await axios.get(
                "https://api.mangadex.org/manga",
                {
                    params: {
                        title: title,
                        limit: 10,
                        includes: ["cover_art", "author", "artist"],
                        contentRating: ["safe", "suggestive"],
                        order: { updatedAt: "desc" },
                    },
                }
            );
            return response.data.data; // Возвращаем найденные манги
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'Неизвестная ошибка');
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
);


const initialState: SearchState  = {
    searchResults: [] as Manga[],
    searchValue: "",
    loading: false,
    error: null
} satisfies SearchState

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearchValue: (state, {payload}) =>{
            state.searchValue = payload;
            // console.log(payload);
        },
        clearSearch: (state) =>{
            state.searchValue = "";  // Очищаем строку поиска
            state.searchResults = [];  // Очищаем результаты поиска
            state.error = null;
        }
    },
    extraReducers:  (builder) =>{
        builder
            .addCase(fetchMangaByTitle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMangaByTitle.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.searchResults = payload;
            })
            .addCase(fetchMangaByTitle.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload || "Ошибка при поиске манги";
            });
    }
})

const { actions, reducer } = searchSlice;

export const { setSearchValue, clearSearch } = actions;
export default reducer;