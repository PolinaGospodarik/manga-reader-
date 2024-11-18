import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchMangaByTitle} from "../../redux/slice/search";

const SearchPage = () => {

    const location = useLocation();
    const dispatch = useAppDispatch();
    const searchValue = new URLSearchParams(location.search).get('q') || '';
    const searchResults = useAppSelector(state => state.search.searchResults);

    useEffect(() => {
        if (searchValue) {
            dispatch(fetchMangaByTitle(searchValue));
        }
    }, [searchValue, dispatch]);

    return (
        <>
            <div>
                <h2>Search Results for "{searchValue}"</h2>
                <ul>
                    {searchResults?.map((manga) => (
                        <li key={manga.id}>
                            <h3>{manga.attributes.title?.en}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SearchPage;