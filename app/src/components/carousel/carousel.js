import {useState, useEffect} from 'react';
import Slide from './slide/slide';

import './Carousel.css';

export default function Carousel(props) {

    
    const [currentIdx,setCurrentIdx] = useState(0);

    const incrementIdx = () => {
        if(currentIdx === props.flashCards.length - 1){
            setCurrentIdx(0);
        }
        else{
            setCurrentIdx(currentIdx+1);
        }
    }

    const decrementIdx = () => {
        if(currentIdx === 0){
            setCurrentIdx(props.flashCards.length - 1);
        }
        else{
            setCurrentIdx(currentIdx - 1);
        }
    }

    return(
        <div className = "carousel-container">
        {
            props.flashCards.map((card, idx) => {
                return (
                    <Slide 
                    key = {idx}
                    idx = {idx}
                    visible = {idx === currentIdx}
                    term = {card.term}
                    definition = {card.definition}
                    />
                )
            })
        }
        <div className="slide-button-container">

        <svg width="24" height="24" 
        className="prev-slide-button" onClick = {decrementIdx}
        fill-rule="evenodd" clip-rule="evenodd"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg>
       
        <span>{currentIdx+1} / {props.flashCards.length}</span>

        <svg className="next-slide-button" 
        onClick = {incrementIdx}
        width="24" height="24" fill-rule="evenodd" clip-rule="evenodd"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg>
        
        </div>
        </div>
    )
}