import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./store/store"
import Login from "./components/Login/Login";

function App() {
  return (
    <>
        <Provider store={store}>
            <Login></Login>
        </Provider>
    </>
  );
}

export default App;
