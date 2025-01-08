import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store/store"
import Header from "./components/Header/Header";
import "../src/utils/axiosInterceptor"
import LoginPage from "./pages/LoginPage/LoginPage";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MangaItem from "./components/MangaItem/MangaItem";
import SearchPage from "./pages/SearchPage/SearchPage";
import ThemeContext from "./roviders/ThemeContext";
import TestPage from "./pages/SearchPage/TestPage";

const AppContent = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <>
            {!isLoginPage && <Header/>}
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/manga/:id" element={<MangaItem/>} />
                <Route path="/search" element={<SearchPage/>} />
                <Route path="/test" element={<TestPage/>} />

            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ThemeContext>
                <Provider store={store}>
                    <AppContent />
                </Provider>
            </ThemeContext>
        </BrowserRouter>
    );
}

export default App;
