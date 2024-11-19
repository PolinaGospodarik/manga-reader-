import React, {useEffect} from 'react';
import "./SearchPage.css"
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchMangaByTitle} from "../../redux/slice/search";
import SearchInput from "../../components/SearchInput/SearchInput"
import {Manga, Relationship} from "../../types/types";
import {fetchMangaId} from "../../redux/slice/manga";

const SearchPage = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const searchValue = new URLSearchParams(location.search).get('q') || '';
    const searchResults = useAppSelector(state => state.search.searchResults);

    useEffect(() => {
        if (searchValue) {
            dispatch(fetchMangaByTitle(searchValue));
        }
    }, [searchValue, dispatch]);

    const handleClick = (manga: Manga) => {
        console.log('Navigating to:', `/manga/${manga.id}`);
        dispatch(fetchMangaId(manga.id));
        navigate(`/manga/${manga.id}`);
    };


    return (
        <>
            <div className="search-page">
                <div className="container">
                    <SearchInput showDropdown={false} inputSize="large"/>
                    <h2>Search Results for "{searchValue}"</h2>
                    <ul>
                        {searchResults?.map((manga) => {
                            const coverArtIndex = manga.relationships.findIndex(
                                (relationship: Relationship) => relationship.type === 'cover_art'
                            );
                            const cover = manga.relationships?.[coverArtIndex]?.attributes;
                            const fileName = cover?.fileName;
                            const coverUrl = fileName ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg` : null;

                            return (
                                <li key={manga.id} onClick={() => handleClick(manga)}>
                                    <div className="search-page__item" >
                                        <div className="search-page__img">{coverUrl &&
                                            <img src={coverUrl} alt="Cover"/>}
                                        </div>
                                        <div className="search-page__title"><h3>{manga.attributes.title?.en}</h3></div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SearchPage;