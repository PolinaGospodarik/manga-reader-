import React, { useState, useEffect } from 'react';
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import logoImg from "../../img/mangadex-logo.svg";
import logoText from "../../img/mangadex-wordmark-black.svg";
import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    }, []);

    const handleClickLogo = () => {
        navigate("/");
    };

    return (
        <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-wrapper">
                    <div className="header-left" onClick={handleClickLogo}>
                        <img src={logoImg} alt="logo-img" />
                        <img src={logoText} alt="" className="logo-wordmark" />
                    </div>
                    <div className="header-right">
                        <SearchInput showDropdown={true} inputSize="small"/>
                        <button className="header-right__button-theme">
                            <FontAwesomeIcon className="button-theme__icon" icon={faDroplet} />
                        </button>
                        <div className="header-right__avatar">
                            <img className="avatar" src="https://mangadex.org/img/avatar.png" alt="avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
