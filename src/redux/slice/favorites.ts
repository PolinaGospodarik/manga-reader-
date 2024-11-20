import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import {Favorite, ListState} from "../../types/types";
//
// const BASE_URL = 'https://api.mangadex.org/v2/user/me/list';
//
// // добавления манги в избранное
// export const addToFavorites = createAsyncThunk(
//     'favorites/addToFavorites',
//     async ({ mangaId, accessToken }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 BASE_URL,
//                 {
//                     data: {
//                         type: 'list',
//                         attributes: {
//                             mangaId: mangaId,
//                             status: 'reading',
//                         },
//                     },
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
//
// //  удаления манги из избранного
// export const removeFromFavorites = createAsyncThunk(
//     'favorites/removeFromFavorites',
//     async ({ mangaId, accessToken }, { rejectWithValue }) => {
//         try {
//             const response = await axios.delete(
//                 `${BASE_URL}/${mangaId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
//
// const initialState: Favorite = {
//     favorites: [],
//     loading: false,
//     error: null,
// }
//
// const favoritesSlice = createSlice({
//     name: 'favorites',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(addToFavorites.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(addToFavorites.fulfilled, (state, {payload}) => {
//                 state.loading = false;
//                 state.favorites.push(payload);
//             })
//             .addCase(addToFavorites.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(removeFromFavorites.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(removeFromFavorites.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.favorites = state.favorites.filter(
//                     (manga) => manga.id !== action.payload.id // Удаляем мангу из списка
//                 );
//             })
//             .addCase(removeFromFavorites.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });
//
//
// const { actions, reducer } = favoritesSlice;
//
// export default reducer;