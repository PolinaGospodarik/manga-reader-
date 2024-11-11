import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../slice/users"
import mangaReducer from "../slice/manga"

const rootReducer ={
    users: usersReducer,
    manga: mangaReducer
}

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store