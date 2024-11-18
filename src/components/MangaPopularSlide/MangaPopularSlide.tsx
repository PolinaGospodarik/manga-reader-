import React from 'react';
import "./MangaPopularSlide.css"
import {Manga, Relationship} from "../../types/types";
import TagList from "../TagList/TagList";
import {NavigationButtons} from "../NavigationButtons/NavigationButtons";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {fetchMangaId} from "../../redux/slice/manga";


const MangaPopularSlide = ({manga, index}:{manga: Manga, index: number}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const typesToFind = ['cover_art', 'author', 'artist'];
    const indexes = typesToFind.map((type) =>
        manga.relationships.findIndex(
            (relationship: Relationship) => relationship.type === type
        )
    );
    const [coverArtIndex, authorIndex, artistIndex] = indexes;

    const cover = manga.relationships?.[coverArtIndex]?.attributes;
    const fileName = cover?.fileName;
    const [coverUrl, backgroundUrl ] = fileName
        ? [
            `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`,
            `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`
        ] : [null, null];

    const handleClick = () => {
        dispatch(fetchMangaId(manga.id));
        navigate(`/manga/${manga.id}`);
    }

    return (
        <>
            <div className="slide-popular"  style={{ backgroundImage: `url(${backgroundUrl})` }} onClick={handleClick}>
                <div className="container">
                    <div className="popular-title">Popular New Titles</div>
                    <div className="slide-popular-wrapper">
                        <a className="slide-popular-left__img">
                            {coverUrl ? (
                                <img src={coverUrl} alt={manga.attributes?.title?.en || 'Cover'}/>
                            ) : (
                                <p>Обложка не доступна</p>
                            )}
                        </a>
                        <div className="slide-popular-right__text">
                            <div className="text-top">
                                <div className="text-top__title">
                                    <h2>{manga.attributes.title?.en || ''}</h2>
                                </div>
                                <TagList tags={manga.attributes.tags}/>
                                <div className="text-top__description">
                                    <p>{manga.attributes.description?.en || ''}</p>
                                </div>
                            </div>
                            <div className="text-bottom">
                                <div className="text-bottom__creators">
                                    <span
                                        className="creators-author">{manga.relationships[authorIndex].attributes?.name}</span>
                                    <span
                                        className="creators-artist">,{manga.relationships[artistIndex].attributes?.name}</span>
                                </div>
                                <div className="text-bottom__other">
                                    <div className="other__numbering">NO.{index + 1}</div>
                                    <div className="other__navigation"><NavigationButtons/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MangaPopularSlide;