import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../slice/users"
import mangaReducer from "../slice/manga"
import listReducer from "../slice/list"
import searchReducer from "../slice/search"

const rootReducer ={
    users: usersReducer,
    manga: mangaReducer,
    list: listReducer,
    search: searchReducer
}

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store