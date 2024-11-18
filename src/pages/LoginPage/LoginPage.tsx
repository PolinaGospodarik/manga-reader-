import React from 'react';
import "./LoginPage.css"
import Login from "../../components/Login/Login"
import logoImg from "../../img/mangadex-logo.svg"
import logoText from "../../img/mangadex-wordmark-white.svg"

const LoginPage = () => {
    return (
        <>
            <div className="login">
                <div className="container">
                    <a href="#" className="logo">
                        <img src={logoImg} alt="img-logo"/>
                        <img src={logoText} alt="text-logo"/>
                    </a>
                    <Login></Login>
                </div>
            </div>
        </>
    );
};

export default LoginPage;