import React, {useEffect, useState} from 'react';
import  "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faDroplet} from '@fortawesome/free-solid-svg-icons';
import logoImg from "../../img/mangadex-logo.svg";
import logoText from "../../img/mangadex-wordmark-black.svg";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {clearSearch, fetchMangaByTitle, setSearchValue} from "../../redux/slice/search";


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch = useAppDispatch();
    // const [searchValue, setSearchValue] = useState("");

    const searchValue = useAppSelector((state: any) => state.search.searchValue);
    const searchResults = useAppSelector(state => state.search.searchResults);

    useEffect(() => {
        window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 50));
    }, []);

    const handleSearch = () => {
        if (searchValue.trim() === "") {
            dispatch(clearSearch());
        }else{
            dispatch(fetchMangaByTitle(searchValue));
        }
    };

    return (
        <>
            <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="header-wrapper">
                        <div className="header-left">
                            <img src={logoImg} alt="logo-img"/>
                            <img src={logoText} alt="" className="logo-wordmark"/>
                        </div>
                        <div className="header-right">
                            <label className="header-right__search">
                                <input type="search" placeholder="Search" className="search" onChange={(e) => dispatch(setSearchValue(e.target.value))} />
                                {searchResults && searchResults.length > 0 ? (
                                    <ul className="search-field">
                                        {searchResults.map(manga => (
                                            <li className="search-field__item" key={manga.id}>{manga.attributes.title?.en}</li>
                                        ))}
                                    </ul>
                                ) : null}
                                <button type="button" className="search-button" onClick={handleSearch}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                </button>
                            </label>

                            <button className="header-right__button-theme">
                                <FontAwesomeIcon className="button-theme__icon" icon={faDroplet}/>
                                {/*<span className="button-theme__text">Theme</span>*/}
                            </button>
                            <div className="header-right__avatar">
                                <img className="avatar" src="https://mangadex.org/img/avatar.png" alt="avatar"/>
                            </div>
                        </div>
                    </div>
                    {/*<div className="manga-slider__title"><h2>Popular New Titles</h2></div>*/}
                </div>
            </div>
        </>
    );
};

export default Header;