import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ListState, MangaDetails, Relationship} from "../../types/types";

export const fetchMangaSelfPublished = createAsyncThunk<
    { listId: string, mangaData: MangaDetails[], listName: string },
    { listId: string, contentRating: string[] },
    { rejectValue: string }
>(
    "list/fetchMangaSelfPublished",
    async ({ listId, contentRating }, { rejectWithValue }) => {
        try {
            const listResponse: { data: { data: { attributes: { name: string }; relationships: Relationship[] } } } =
                await axios.get(`https://api.mangadex.org/list/${listId}`);

            // Извлечение ID манги
            const mangaIds: string[] = listResponse.data.data.relationships
                .filter((rel: Relationship) => rel.type === "manga")
                .map((rel: Relationship) => rel.id);

            // Формируем параметры запроса
            const params = {
                ids: mangaIds, // IDs передаются как массив
                limit: mangaIds.length, // Ограничение по количеству результатов
                contentRating, // Фильтр по рейтингу
                includes: ["cover_art", "content_rating"], // Дополнительные включения
                order: {
                    createdAt: "desc",
                    title: "asc",
                },
                hasAvailableChapters: true, // Только с доступными главами
            };

            // Выполняем запрос
            const mangaDetailsResponse: { data: { data: MangaDetails[] } } =
                await axios.get(`https://api.mangadex.org/manga`, { params });

            // Данные манги
            const mangaData = mangaDetailsResponse.data.data;

            // Возвращаем результат
            return {
                listId,
                mangaData,
                listName: listResponse.data.data.attributes.name,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
                return rejectWithValue(error.response?.data.message || 'Неизвестная ошибка');
            }
            console.error('Unknown error details:', error);
            return rejectWithValue('Неизвестная ошибка');
            }
    }
);

const initialState: ListState = {
    mangaSelfPublished: {},
    loading: false,
    error: null
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMangaSelfPublished.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMangaSelfPublished.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.mangaSelfPublished[payload.listId] = {
                    mangaData: payload.mangaData,
                    listName: payload.listName
                };

                console.log(payload);
            })
            .addCase(fetchMangaSelfPublished.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload || 'Ошибка при загрузке манги';
            })
    }
})

const { actions, reducer } = listSlice;

export default reducer;
