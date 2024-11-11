import React, {useEffect} from 'react';
import { NavigationButtons } from "../NavigationButtons/NavigationButtons"
import TagList from "../TagList/TagList";
import './MangaSlider.css'

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchManga } from "../../redux/slice/manga";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';

import { Relationship} from "../../types/types";


const MangaSlider = () => {

    const dispatch = useAppDispatch();
    const mangaSlider = useAppSelector((state) => state.manga.mangaList);

    useEffect(() => {
        dispatch(fetchManga())
    }, [dispatch]);

    return (
        <>
            <div className="manga-slider">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }}
                    loop={true}
                    modules={[Navigation]}
                    // pagination={{ clickable: true }}
                >
                    {mangaSlider && mangaSlider.length > 0 ? (
                        mangaSlider.map((manga, index) => {

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

                            return (<SwiperSlide key={manga.id} className="slide"  style={{ backgroundImage: `url(${backgroundUrl})` }}>
                                    <div className="slide-container">
                                        <a className="slide-left__img">
                                            {coverUrl ? (
                                                <img src={coverUrl} alt={manga.attributes?.title?.en || 'Cover'}/>
                                            ) : (
                                                <p>Обложка не доступна</p>
                                            )}
                                        </a>
                                        <div className="slide-right__text">
                                            <div className="text-top">
                                                <div className="text-top__title">
                                                    <h2>{manga.attributes.title?.en || 'Название недоступно'}</h2>
                                                </div>
                                                <TagList tags={manga.attributes.tags} />
                                                <div className="text-top__description">
                                                    <p>{manga.attributes.description?.en || 'Описание недоступно'}</p>
                                                </div>
                                            </div>
                                            <div className="text-bottom">
                                                <div className="text-bottom__author">
                                                    <span>{manga.relationships[authorIndex].attributes?.name}</span>
                                                    <span>,{manga.relationships[artistIndex].attributes?.name}</span>
                                                </div>
                                                <div className="text-bottom__other">
                                                    <div className="other__numbering">NO.{index + 1}</div>
                                                    <div className="other__navigation"><NavigationButtons/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    ) : (
                        <div>Нет доступной манги</div>
                    )}
                </Swiper>

            </div>
        </>
    );
};


export default MangaSlider;