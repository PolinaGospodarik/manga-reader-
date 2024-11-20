import React, {useContext, useEffect} from 'react';
import "./MangaItem.css"
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useParams} from "react-router-dom";
import {fetchMangaId} from "../../redux/slice/manga";
import {Relationship} from "../../types/types";
import {themeContext} from "../../roviders/ThemeContext";

const MangaItem = () => {
    const {id} = useParams();
    const [color] = useContext(themeContext);

    const dispatch = useAppDispatch();
    const mangaItem = useAppSelector(state =>  state.manga.mangaItem);
    const loading = useAppSelector(state => state.manga.loading);
    const error = useAppSelector(state => state.manga.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchMangaId(id))
        }
    }, [dispatch, id]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    if (!mangaItem) {
        return <p>Данные не найдены</p>;
    }

    const typesToFind = ['cover_art', 'author', 'artist'];
    const indexes = typesToFind.map((type) =>
        mangaItem?.data.relationships.findIndex(
            (relationship: Relationship) => relationship.type === type
        )
    );
    const [coverArtIndex, authorIndex, artistIndex] = indexes;

    const cover = mangaItem?.data.relationships?.[coverArtIndex]?.attributes;
    const fileName = cover?.fileName;
    const [coverUrl, backgroundUrl ] = fileName
        ? [
            `https://uploads.mangadex.org/covers/${id}/${fileName}.256.jpg`,
            `https://uploads.mangadex.org/covers/${id}/${fileName}`
        ] : [null, null];

    const { data, rating, follows } = mangaItem;

    return (
        <>
            <div className={`manga-id background-${color}`}>
                <div className={`manga-id-background`} style={{backgroundImage: `url(${backgroundUrl})` }}>
                    <div className="manga-id-overlay"></div>
                </div>
                <div >
                <div className="container">
                    <div className="manga-id-wrapper">
                        <div className="manga-id__img">
                            {coverUrl ? (
                                <img src={coverUrl} alt={mangaItem?.data.attributes?.title?.en || 'Cover'}/>
                            ) : (
                                <p>Обложка не доступна</p>
                            )}
                        </div>
                        <div className="manga-id__content">

                            <div className="manga-id__content-top">
                                <div className={`manga-id__title text-${color}`}>
                                    <h1>{mangaItem?.data.attributes?.title?.en}</h1>
                                </div>
                                <div className="manga-id__creators">
                                    <span
                                        className="manga-id__creators-author">{mangaItem?.data.relationships[authorIndex].attributes?.name}</span>
                                    <span
                                        className="manga-id__creators-artist">,{mangaItem?.data.relationships[artistIndex].attributes?.name}</span>
                                </div>
                            </div>
                            <div className="manga-id__content-bottom">
                                <button className="manga-id__button">Add To Library</button>
                                <div className={`manga-id__manga-stats text-${color}`}>
                                    <p>Rating: {rating?.bayesian.toFixed(2)}</p>
                                    <p>Number of subscriptions: {follows}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`manga-id__description text-${color}`}>
                        <p>{mangaItem?.data.attributes?.description.en}</p>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default MangaItem;