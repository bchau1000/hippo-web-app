import React from 'react';
import "./flashcard.css";
class FlashCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="flashcard-container">
                <div id = "term">{this.props.name}</div>
                
                <div id = "desc">{this.props.desc}</div>        
            </div>
        )
    }
}

export default FlashCard;