import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFlip } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/effect-flip/effect-flip.scss';
import './cardSwiper.css';

SwiperCore.use([EffectFlip]);

class CardSwiper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            front: "",
        };
    }

    render() {
        return (
            <Swiper
                id="swiper-main-container"
                spaceBetween={30}
            >
                {
                    this.props.cards.map((flashcard, index) => (
                        <SwiperSlide key={index}>
                            <Swiper
                                id="flip-color"
                                effect= 'flip'
                                direction="vertical"
                            >
                                <SwiperSlide>
                                    <div>
                                        {flashcard.term}
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>{flashcard.definition}</SwiperSlide>
                            </Swiper>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        );
    }
};

export default CardSwiper;

/*

*/