import React, {useEffect} from 'react';
import "./MangaList.css"
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchMangaId, fetchMangaLatest, fetchMangaPopular} from "../../redux/slice/manga";
import {Manga, Relationship} from "../../types/types";
import {useNavigate, useParams} from "react-router-dom";

const MangaList = () => {
    // const {id}= useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const mangaLatest = useAppSelector((state) => state.manga.mangaLatest);

    const handleClick = (manga: Manga) => {
        dispatch(fetchMangaId(manga.id));
        navigate(`/manga/${manga.id}`);
    }

    return (
        <>
            <div className="manga-latest">
                <div className="container">
                    <div className="manga-latest__title"><h2>Latest Updates</h2></div>
                    <div className="manga-latest-wrapper">
                        {mangaLatest && mangaLatest.length > 0 ? (
                            mangaLatest.map((manga) => {

                                const typesToFind = ['cover_art', 'author', 'artist'];
                                const indexes = typesToFind.map((type) =>
                                    manga.relationships.findIndex(
                                        (relationship: Relationship) => relationship.type === type
                                    )
                                );
                                const [coverArtIndex, authorIndex, artistIndex] = indexes;

                                const cover = manga.relationships?.[coverArtIndex]?.attributes;
                                const fileName = cover?.fileName;
                                const coverUrl = fileName ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg` : null;

                                return (
                                    <div className="manga-latest__item" key={manga.id} onClick={() => handleClick(manga)}>
                                        <div className="item-left">
                                            <a className="item-left__img">
                                                {coverUrl ? (
                                                    <img src={coverUrl} alt={manga.attributes?.title?.en || 'Cover'}/>
                                                ) : (
                                                    <p>Обложка не доступна</p>
                                                )}
                                            </a>
                                        </div>
                                        <div className="item-right">
                                            <div className="item__title">
                                                <h3>{manga.attributes.title?.en || 'Название недоступно'}</h3>
                                            </div>

                                            <span>{manga.relationships[authorIndex]?.attributes?.name}</span>
                                            <span>{manga.relationships[artistIndex]?.attributes?.name}</span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>Нет доступной манги</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MangaList;