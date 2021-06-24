import { useEffect, useRef, useReducer } from 'react';
import Slide from './slide/slide';

import './carousel.css';

function reducer(state, action) {
    let newState = {
        current: state.current,
        length: state.length,
    }

    switch (action.type) {
        case 'INCREMENT':
            newState.current = state.current + 1;

            if (state.current >= state.length - 1)
                newState.current = 0;

            return newState;
        case 'DECREMENT':
            newState.current = state.current - 1;

            if (state.current <= 0)
                newState.current = state.length - 1;

            return newState;
        default:
            return state;
    }
}

export default function Carousel(props) {
    const [currentSlide, setCurrentSlide] = useReducer(reducer, {
        current: 0,
        length: props.flashCards.length,
    });
    const slideRefs = useRef([]);

    useEffect(() => {
        const idx = currentSlide.current;

        if (slideRefs.current[idx]) {
            slideRefs.current[idx].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            })

        }
    }, [currentSlide, slideRefs])

    return (
        <div
            className="carousel-container"
        >
            <div className="carousel-slides">
                {
                    props.flashCards.map((card, idx) => {
                        return (
                            <Slide
                                innerRef={(slide) => slideRefs.current.push(slide)}
                                key={idx}
                                meta={{
                                    idx: idx,
                                    length: props.flashCards.length,
                                }}
                                term={card.term}
                                definition={card.definition}
                            />
                        )
                    })
                }
            </div>

            <div className="slide-button-container">

                <button
                    className="prev-slide-button blank-button"
                    onClick={() => setCurrentSlide({ type: 'DECREMENT' })}
                >
                    <span
                        className="material-icons"
                        style={{ fontSize: '40px' }}
                    >navigate_before</span>
                </button>

                <span>{currentSlide.current + 1} / {props.flashCards.length}</span>

                <button
                    className="next-slide-button blank-button"
                    onClick={() => setCurrentSlide({ type: 'INCREMENT' })}
                >
                    <span
                        className="material-icons"
                        style={{ fontSize: '40px' }}
                    >navigate_next</span>
                </button>

            </div>
        </div>
    )
}