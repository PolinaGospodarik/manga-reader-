import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../slice/users"

const rootReducer ={
    users: usersReducer
}

const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store