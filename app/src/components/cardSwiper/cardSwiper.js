import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFlip, Pagination, Navigation, Keyboard, A11y } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/effect-flip/effect-flip.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './cardSwiper.css';

SwiperCore.use([EffectFlip, Pagination, Keyboard, Navigation, A11y]);

class CardSwiper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            value: 0,
            swiper: Swiper
        };
    }

    handleFlip(swiper) {
        if(this.state.isFlipped) {
            swiper.slidePrev();
            this.setState({
                isFlipped: !this.state.isFlipped
            });
        }
        else {
            swiper.slideNext();
            this.setState({
                isFlipped: !this.state.isFlipped
            });
        }
        
    }

    render() {
        return (
            <Swiper
                id="swiper-outer-container"                                               
                pagination={{
                    type:'fraction'
                }}

                keyboard={{
                    enabled: true,
                }}
            >
                {
                    this.props.cards.map((flashcard, index) => (
                        <SwiperSlide key={index}>
                            <Swiper
                                id="swiper-inner-container"
                                effect= 'flip'
                                direction="vertical"

                                onClick={(swiper) => this.handleFlip(swiper)}
                                keyboard={{
                                    enabled: true,
                                }}
                            >
                                <SwiperSlide> 
                                    <div id="swiper-inner-background">
                                        <div id="swiper-inner">
                                            {flashcard.term}
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div id="swiper-inner-background">
                                        <div id="swiper-inner">
                                            {flashcard.definition}
                                        </div>
                                    </div>
                                </SwiperSlide>
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