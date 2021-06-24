import { useState, useEffect } from "react";
import "./slide.css";

export default function Slide(props) {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
    }, [props])

    return (
        <div
            ref={props.innerRef}
            className={`slide-content-container ${flipped ? "back-side" : ""}`}
            onClick={() => setFlipped((current) => !current)}
            style={{
                marginLeft: props.meta.idx === 0 ? '50px' : '',
                marginRight: props.meta.idx === props.meta.length - 1 ? '50px' : '',
            }}
        >
            <div className={`slide-term-content ${flipped ? "hidden-side" : ""}`}>
                <div className="slide-text-container" dangerouslySetInnerHTML={{ __html: props.term }} />
            </div>
            <div className={`slide-definition-content ${flipped ? "" : "hidden-side"}` }>
                <div className="slide-text-container" dangerouslySetInnerHTML={{ __html: props.definition }} />
            </div>
        </div>
    );
}
