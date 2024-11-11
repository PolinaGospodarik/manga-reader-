import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchManga} from "../../redux/slice/manga";

const MangaList = () => {
    const dispatch = useAppDispatch();
    const mangaList = useAppSelector((state) => state.manga.mangaList);

    useEffect(() => {
        dispatch(fetchManga())
    }, [dispatch]);

    return (
        <>
            {mangaList && mangaList.length > 0 ? (
                mangaList.map((manga) => {
                    const cover = manga.relationships?.[2]?.attributes;
                    const coverUrl = cover?.fileName
                        ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.fileName}`
                        : null;

                    return (
                        <div key={manga.id}>
                            <h2>{manga.attributes.title?.en || 'Название недоступно'}</h2>
                            <span>
                                {manga.attributes.tags
                                    .map((tag) => tag.attributes.name.en)
                                    .join(", ")}
                            </span>
                            <p>{manga.attributes.description?.en || 'Описание недоступно'}</p>
                            {coverUrl ? (
                                <img src={coverUrl} alt={manga.attributes?.title?.en || 'Cover'}/>
                            ) : (
                                <p>Обложка не доступна</p>
                            )}
                            <span>{manga.relationships[0].attributes?.name}</span>
                            <span>{manga.relationships[1].attributes?.name}</span>
                        </div>
                    );
                })
            ) : (
                <div>Нет доступной манги</div>
            )}
        </>
    );
};

export default MangaList;