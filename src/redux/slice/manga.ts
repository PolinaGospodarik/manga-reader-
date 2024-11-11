import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {Manga, MangaState, MangaAttributes, Tag, TagAttributes, TagName, Relationship} from "../../types/types";


export const fetchManga = createAsyncThunk<Manga[], undefined, { rejectValue: string} >(
    "manga/fetchManga",
    async (_, { rejectWithValue }) =>{
        try{
            const response = await axios.get("https://api.mangadex.org/manga?limit=30&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc&includes%5B%5D=cover_art&includes[]=author&includes[]=artist")
            console.log(response.data.data)
            return response.data.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || 'Неизвестная ошибка');
            }
            return rejectWithValue('Неизвестная ошибка');
        }
    }
)
const initialState : MangaState = {
    mangaList: [],
    loading: false,
    error: null
} satisfies MangaState

const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers:{},
    extraReducers:  (builder) =>{
        builder
            .addCase(fetchManga.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchManga.fulfilled, (state, {payload})=>{
                state.loading = false;
                state.mangaList =payload
                console.log(payload)
            })
            .addCase(fetchManga.rejected, (state, {payload})=>{
                state.loading = false;
                state.error = payload || 'Ошибка при загрузке манги';
            })
    }
})

const { actions, reducer } = mangaSlice;

export const {  } = actions;
export default reducer;