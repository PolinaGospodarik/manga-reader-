import React, {useEffect} from 'react';
import "./MangaItem.css"
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useParams} from "react-router-dom";
import {fetchMangaId} from "../../redux/slice/manga";
import {Relationship} from "../../types/types";

const MangaItem = () => {
    const {id} = useParams();

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

    // Извлекаем данные из mangaItem
    const { data, rating, follows } = mangaItem;  // mangaItem содержит информацию о манге и стат

    return (
        <>
            <div className="manga-id">
                <div className="manga-id-backgroud" style={{backgroundImage: `url(${backgroundUrl})`}}>
                    <div className="manga-id-overlay">

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
                                <div className="manga-id__title">
                                    <h1>{mangaItem?.data.attributes?.title?.en}</h1>
                                </div>
                                {/*<p>{mangaItem?.data.attributes?.description.en}</p>*/}
                                <div className="manga-id__creators">
                                <span
                                    className="manga-id__creators-author">{mangaItem?.data.relationships[authorIndex].attributes?.name}</span>
                                    <span
                                        className="manga-id__creators-artist">,{mangaItem?.data.relationships[artistIndex].attributes?.name}</span>
                                </div>
                            </div>
                            <button className="manga-id__button">Добавиь в избранное</button>
                            <div className="manga-id__manga-stats">
                                <h3>Рейтинг:{rating?.bayesian.toFixed(2)}</h3>
                                <div>
                                    <h3>Количество подписок:</h3>
                                    <p>{follows}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </div>
                </div>

            </div>
        </>
    );
};

export default MangaItem;