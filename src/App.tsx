import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store/store"
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import MangaList from "./components/MangaList/MangaList";
import "../src/utils/axiosInterceptor"
import MangaSlider from "./components/MangaSlider/MangaSlider";

function App() {
  return (
    <>
        <Provider store={store}>
            <Header></Header>
            {/*<MangaList></MangaList>*/}
            <MangaSlider></MangaSlider>
            <Login></Login>
        </Provider>
    </>
  );
}

export default App;
