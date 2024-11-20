import React from 'react';
import "./NavigationButtons.css"
import { useSwiper } from 'swiper/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const NavigationButtons = () => {
    const swiper = useSwiper();

    const handlePrev = () => {
        swiper?.slidePrev();
    };

    const handleNext = () => {
        swiper?.slideNext();
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
