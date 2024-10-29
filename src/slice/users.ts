import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthResponse {
    access_token: string;
    refresh_token: string;
}

interface UsersState {
    access_token: string | null;
    refresh_token: string | null;
    loading: boolean;
    error: string | null;
}

export const login = createAsyncThunk<AuthResponse, { username: string; password: string }, { rejectValue: string }>(
    'users/login',
    async ({ username, password }, { rejectWithValue }) => {
        const creds = new URLSearchParams({
            grant_type: 'password',
            username,
            password,
            client_id: 'personal-client-c40f284a-f83f-498e-b8b3-09665758f4a9-f429155c',
            client_secret: '4aJRvTDjXFIWgJhGcdNoxLV4fXF6Wf1I',
        });

        try {
            const response = await axios.post<AuthResponse>(
                'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
                creds,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            if (error) {
                return rejectWithValue("ошибка от сервера");
            } else {
                return rejectWithValue('Произошла неизвестная ошибка');
            }
        }
    }
);

export const refreshAccessToken = createAsyncThunk<AuthResponse, { refresh_token: string }, { rejectValue: string }>(
    'users/refreshAccessToken',
    async ({ refresh_token }, { rejectWithValue }) => {
        const creds = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
            client_id: 'personal-client-c40f284a-f83f-498e-b8b3-09665758f4a9-f429155c',
            client_secret: '4aJRvTDjXFIWgJhGcdNoxLV4fXF6Wf1I',
        });

        try {
            const response = await axios.post<AuthResponse>(
                'https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token',
                creds,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            return response.data; // Возвращаем новые токены
        } catch (error) {
            console.log(error);
            return rejectWithValue('Произошла неизвестная ошибка при обновлении токена');
            // if (axios.isAxiosError(error)) {
            //     console.error('Ошибка обновления токена:', error.response?.data || error.message);
            //     return rejectWithValue(error.response?.data?.error || 'Ошибка обновления токена');
            // } else {
            //     console.error('Неизвестная ошибка:', error);
            //     return rejectWithValue('Произошла неизвестная ошибка при обновлении токена');
            // }
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        access_token: null as string | null,
        refresh_token: null as string | null,
        loading: false,
        error: null as string | null,
    } as UsersState,
    reducers: {
        logout: (state) => {
            state.access_token = null;
            state.refresh_token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, {payload}: {payload : any}) => {
                state.loading = false;
                state.access_token = payload.access_token;
                state.refresh_token = payload.refresh_token;
            })
            .addCase(login.rejected, (state, {payload}: {payload : any}) => {
                state.loading = false;
                state.error = payload as string;
            })
            .addCase(refreshAccessToken.fulfilled, (state, {payload}: {payload : any}) => {
                state.access_token = payload.access_token;
            })
            .addCase(refreshAccessToken.rejected, (state, {payload}: {payload : any}) => {
                state.error = payload as string;
            });
    }
});

const { actions, reducer } = usersSlice;
export const { logout } = actions;
export default reducer;
