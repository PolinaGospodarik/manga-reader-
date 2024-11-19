import React, { useState } from 'react';
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearSearch, fetchMangaByTitle, setSearchValue } from "../../redux/slice/search";
import { Manga, Relationship } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { fetchMangaId } from "../../redux/slice/manga";

interface SearchInputProps {
    showDropdown?: boolean;
    inputSize?: 'small' | 'large';
}

const SearchInput: React.FC<SearchInputProps> = ({ showDropdown = true, inputSize = 'small' }) => {
    const [isListVisible, setIsListVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const searchValue = useAppSelector((state: any) => state.search.searchValue);
    const searchResults = useAppSelector(state => state.search.searchResults);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(event.target.value));
        if (event.target.value.trim()) {
            setIsListVisible(true);
            dispatch(fetchMangaByTitle(event.target.value));
        } else {
            setIsListVisible(false);
            dispatch(clearSearch());
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        dispatch(clearSearch());
    };

    const handleClick = (manga: Manga) => {
        dispatch(fetchMangaId(manga.id));
        navigate(`/manga/${manga.id}`);
        setIsListVisible(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate(`/search?q=${searchValue}`);
            setIsListVisible(false);
        }
    };

    const handleClearSearch = () => {
        dispatch(setSearchValue(''));
        setIsListVisible(false);
    };

    // Условное использование классов для размеров поля поиска
    const inputClass = `search ${inputSize === 'large' ? 'search--large' : 'search--small'} ${inputSize === 'small' && isFocused ? 'search--focused' : ''}`;

    return (
        <div className="header-right__search">
            <input
                type="search"
                placeholder="Search"
                className={inputClass}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={inputSize === 'small' ? handleKeyDown : undefined}
            />
            {showDropdown && isListVisible && searchResults?.length > 0 && isFocused && (
                <ul className="search-field">
                    {searchResults.map((manga) => {
                        const coverArtIndex = manga.relationships.findIndex(
                            (relationship: Relationship) => relationship.type === 'cover_art'
                        );
                        const cover = manga.relationships?.[coverArtIndex]?.attributes;
                        const fileName = cover?.fileName;
                        const coverUrl = fileName ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}` : null;

                        return (
                            <li className="search-field__item" key={manga.id} onMouseDown={() => handleClick(manga)}>
                                <div className="search-field__item-wrapper">
                                    <div className="search-field__item-img">{coverUrl && <img src={coverUrl} alt="Cover" />}</div>
                                    <div className="search-field__item-title"><h4>{manga.attributes.title?.en}</h4></div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            {searchValue && (
                <button
                    type="button"
                    className="search-button"
                    onClick={handleClearSearch}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            )}
            {!searchValue && (
                <button type="button" className="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            )}
        </div>
    );
};

export default SearchInput;
