import "./flashcard.css";

export default function FlashCard(props) {
    return (
        <div className="flashcard-container">
            <div className="term">{props.name}</div>

            <div className="desc">{props.definition}</div>
        </div>
    )
}