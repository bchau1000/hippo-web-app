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
                <div>{this.props.name}</div>
                <div>{this.props.desc}</div>
            </div>
        )
    }
}

export default FlashCard;