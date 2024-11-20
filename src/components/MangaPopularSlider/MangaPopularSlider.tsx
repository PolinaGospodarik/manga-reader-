import React, {useEffect} from 'react';

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchMangaPopular } from "../../redux/slice/manga";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';

import MangaPopularSlide from "../MangaPopularSlide/MangaPopularSlide";


const MangaPopularSlider = () => {

    const dispatch = useAppDispatch();
    const {mangaPopular, loading, error} = useAppSelector((state) => state.manga);

    useEffect(() => {
        dispatch(fetchMangaPopular())
    }, [dispatch]);

    return (
        <>
            <div className="manga-slider">
                {loading ? (
                    <div className="loading">Загрузка манги...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : mangaPopular && mangaPopular.length > 0 ? (
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.custom-next',
                            prevEl: '.custom-prev',
                        }}
                        loop={true}
                        modules={[Navigation]}
                    >
                        {mangaPopular.map((manga, index) => (
                            <SwiperSlide key={manga.id}>
                                <MangaPopularSlide manga={manga} index={index}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div>Нет доступной манги</div>
                )}
            </div>
        </>
    );
};


export default MangaPopularSlider;