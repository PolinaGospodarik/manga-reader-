import React, {useContext, useState} from 'react';
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    clearSearch,
    fetchMangaByTitle,
    setPageSearchValue,
    setSearchValue
} from "../../redux/slice/search";
import { Manga, Relationship } from "../../types/types";
import { useNavigate } from "react-router-dom";
import {fetchMangaId} from "../../redux/slice/manga";
import {themeContext} from "../../roviders/ThemeContext";

const SearchInput = () => {
    const [isListVisible, setIsListVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [color] = useContext(themeContext);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    let searchValue = useAppSelector((state: any) => state.search.searchValue);
    let pageSearchValue = useAppSelector((state: any) => state.search.pageSearchValue);
    const searchResults = useAppSelector(state => state.search.searchResults);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        dispatch(setSearchValue(searchValue));
        if (searchValue.trim()) {
            dispatch(fetchMangaByTitle({ title: searchValue, offset: 0 }));
            setIsListVisible(true);
        } else {
            dispatch(clearSearch());
            setIsListVisible(false);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        dispatch(setSearchValue(""));
    };

    const handleClick = (manga: Manga) => {
        dispatch(fetchMangaId(manga.id));
        navigate(`/manga/${manga.id}`);
        setIsListVisible(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate(`/search?q=${searchValue}`);
            dispatch(setPageSearchValue(searchValue))
            dispatch(setSearchValue(''));
            setIsListVisible(false);
        }
    };

    const handleClearSearch = () => {
        dispatch(setSearchValue(''));
        setIsListVisible(false);
    };

    return (
        <div className="header-right__search">
            <input
                type="search"
                placeholder="Search"
                className={`search-input ${isFocused ? 'search--focused' : ''} grey-${color} text-${color} placeholder-${color}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
            />
            {isListVisible && searchResults?.length > 0 && isFocused && (
                <ul className={`search-field background-${color}`}>
                    {searchResults.map((manga) => {
                        const coverArtIndex = manga.relationships.findIndex(
                            (relationship: Relationship) => relationship.type === 'cover_art'
                        );
                        const cover = manga.relationships?.[coverArtIndex]?.attributes;
                        const fileName = cover?.fileName;
                        const coverUrl = fileName ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}` : null;

                        return (
                            <li className="search-field__item" key={manga.id} onMouseDown={() => handleClick(manga)}>
                                <div className={`search-field__item-wrapper grey-${color}`}>
                                    <div className="search-field__item-img">{coverUrl && <img src={coverUrl} alt="Cover" />}</div>
                                    <div className={`search-field__item-title text-${color}`}><h4>{manga.attributes.title?.en}</h4></div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            {searchValue && (
                <button
                    type="button"
                    className={`search-button text-${color}`}
                    onClick={handleClearSearch}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            )}
            {!searchValue && (
                <button type="button" className={`search-button  text-${color}`}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            )}
        </div>
    );
};

export default SearchInput;
