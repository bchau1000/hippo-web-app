import React from 'react';
import "./flashcard.css";
class FlashCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="flashcard-container">
                <div className = "term">{this.props.name}</div>
                
                <div className = "desc">{this.props.desc}</div>        
            </div>
        )
    }
}

export default FlashCard;