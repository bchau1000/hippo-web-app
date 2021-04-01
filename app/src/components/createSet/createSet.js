import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CardForm from "./cardForm/cardForm.js";
import "./createSet.css";

class CreateSet extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            flash_cards: [0, 0, 0, 0],
        }
    }

    // front is a bool, true inserts a card to the front of the list, false appends a card to the back of the list
    addCard(front) {
        let new_flash_cards = this.state.flash_cards.slice();

        if(front) {
            new_flash_cards.unshift(0);

        }
        else {
            new_flash_cards.push(0);
        }

        this.setState({
            flash_cards: new_flash_cards,
        });
    }

    deleteCard = (index) => {
        if(this.state.flash_cards.length > 1) {
            let new_flash_cards = this.state.flash_cards.slice();
        
            new_flash_cards.splice(index, 1);

            this.setState({
                flash_cards: new_flash_cards,
        });
        }
        
    }

    clearCard(index) {
        console.log("Clearing card: " + index);
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

                <div className="add-card-container" onClick={() => this.addCard(true)}>
                        <div className="add-card">
                            <AddIcon className="add-card-icon"></AddIcon>
                            <div className="add-card-text">Add a card</div>
                        </div>
                </div>

                <div className="center-container">
                    {this.state.flash_cards.map((_, index) => {
                        return <CardForm delete={this.deleteCard} clear={this.clearCard} cardNum={index}></CardForm>;
                    })}
                </div>
                
                <div className="add-card-container" onClick={() => this.addCard(false)}>
                    <div className="add-card">
                        <AddIcon className="add-card-icon"></AddIcon>
                        <div className="add-card-text">Add a card</div>
                    </div>
                </div>

                <div className="submit-container"></div>
            </div>
        )
    }
}

export default CreateSet;



// <CardForm delete={this.deleteCard} clear={this.clearCard} cardNum="1"></CardForm>