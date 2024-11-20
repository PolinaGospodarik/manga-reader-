    import React, {useContext} from 'react';
    import "./MangaSlide.css"
    import {Manga, Relationship} from "../../types/types";
    import {useAppDispatch} from "../../hooks";
    import {fetchMangaId} from "../../redux/slice/manga";
    import {useNavigate} from "react-router-dom";
    import {themeContext} from "../../roviders/ThemeContext";

    const MangaSlide = ({manga, index}:{manga: Manga, index: number}) => {

        const dispatch = useAppDispatch();
        const navigate = useNavigate();
        const [color] = useContext(themeContext);

        const coverArtIndex = manga.relationships.findIndex(
            (relationship: Relationship) => relationship.type === 'cover_art'
        )

        const cover = manga.relationships?.[coverArtIndex]?.attributes;
        const fileName = cover?.fileName;
        const coverUrl= fileName ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`: null;

        const handleClick = () => {
            dispatch(fetchMangaId(manga.id));
            navigate(`/manga/${manga.id}`);
        }

        return (
            <>
                <div className="slide" onClick={handleClick}>
                    <div className="slide-wrapper">
                        <div className="slide__img">
                            {coverUrl ? (
                                <img src={coverUrl} alt={manga.attributes?.title?.en || 'Cover'}/>
                            ) : (
                                <p>Обложка не доступна</p>
                            )}
                            <button className="slide-read">read</button>
                        </div>
                        <div className="slide__text">
                            <div className={`text__title text-${color}`}>
                                <h3>{manga.attributes.title?.en || ''}</h3>
                            </div>
                            <div className="text__description">
                                <h3>{manga.attributes.description?.en || ''}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    export default MangaSlide;