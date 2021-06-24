import './flashCard.css';

export default function FlashCard(props) {
    return (
        <div className="flash-card-container">
            <div className="fc-term-container">
                <div className="fc-text-container" dangerouslySetInnerHTML={{__html: props.term}}/>
            </div>
            <div className="fc-definition-container">
                <div className="fc-text-container" dangerouslySetInnerHTML={{__html: props.definition}}/>
            </div>
        </div>
    )
}