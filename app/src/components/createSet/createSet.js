import React from 'react';

import CardForm from "./cardForm/cardForm.js";
import "./createSet.css";

class CreateSet extends React.Component {
    
    deleteCard(cardNum) {
        console.log("Deleting card: " + cardNum);
    }

    clearCard(cardNum) {
        console.log("Clearing card: " + cardNum);
    }

    render() {
        return (
            <div className="container">
                <div></div>
                <form className="meta-form">
                    <div className="header">
                        Create a new study set
                    </div>
                    <div className="field-container">
                        <input id="set-title" placeholder="Enter a title..."></input>
                        <div className="field-label">TITLE</div>
                    </div>
                    <div className="field-container">
                        <input id="set-desc" placeholder="Add a description..."></input>
                        <div className="field-label">DESCRIPTION</div>
                    </div>
                </form>
                <div className="center-container">
                    <CardForm delete={this.deleteCard} clear={this.clearCard} cardNum="1"></CardForm>
                    <CardForm delete={this.deleteCard} clear={this.clearCard} cardNum="2"></CardForm>
                    <CardForm delete={this.deleteCard} clear={this.clearCard} cardNum="3"></CardForm>
                </div>
                <div className="submit-container"></div>
            </div>
        )
    }
}

export default CreateSet;