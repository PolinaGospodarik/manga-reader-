import React from 'react';
import "./NavigationButtons.css"
import { useSwiper } from 'swiper/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const NavigationButtons = () => {
    const swiper = useSwiper();

    const handlePrev = () => {
        if (swiper) {
            swiper.slidePrev();  // Переключаем на предыдущий слайд
        }
    };

    const handleNext = () => {
        if (swiper) {
            swiper.slideNext();
        }
    };

    return (
        <>
            <button className="custom-prev" onClick={handlePrev}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="custom-next" onClick={handleNext}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </>
    );
};
