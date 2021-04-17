import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CardForm from "./cardForm/cardForm.js";
import "./createSet.css";

//const API_URL = "http://localhost:9000/api/sets/new";

class CreateSet extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: "",
            flash_cards: [
                {
                    "term": "",
                    "def": "",
                },
                {
                    "term": "",
                    "def": "",
                },
            ],
        }
    }

    setTitle = (new_title) => {
        this.setState({
            title: new_title,
        });
    }

    setDesc = (new_desc) => {
        this.setState({
            desc: new_desc,
        });
    }

    // front is a bool, true inserts a card to the front of the list, false appends a card to the back of the list
    addCard = (front) => {
        let new_flash_cards = this.state.flash_cards.slice();
        let new_id_counter = this.state.id_counter + 1;
        
        if(front) {
            new_flash_cards.unshift({
                "term": "",
                "def": "",
            });
        }
        else {
            new_flash_cards.push({
                "term": "",
                "def": "",
            });
        }

        this.setState({
            flash_cards: new_flash_cards,
            id_counter: new_id_counter,
        });
    }

    deleteCard = (index) => {
        if(this.state.flash_cards.length > 2) {
            let new_flash_cards = this.state.flash_cards.slice();
        
            new_flash_cards.splice(index, 1);
            console.log(new_flash_cards);
            this.setState({
                flash_cards: new_flash_cards,
            });
        }
    }

    clearCard = (index) => {
        let new_flash_cards = this.state.flash_cards.slice();

        new_flash_cards[index] = {
            "term": "",
            "def": "",
        }

        this.setState({
            flash_cards: new_flash_cards,
        });
    }

    setCardTerm = (index, term) => {
        let new_flash_cards = this.state.flash_cards.slice();

        new_flash_cards[index] = {
            "term": term,
            "def": this.state.flash_cards[index].def,
        }

        this.setState({
            flash_cards: new_flash_cards,
        });
    }

    setCardDef = (index, def) => {
        let new_flash_cards = this.state.flash_cards.slice();
        new_flash_cards[index] = {
            "term": this.state.flash_cards[index].term,
            "def": def,
        }
        this.setState({
            flash_cards: new_flash_cards,
        });
    }

    async createSet() {
        const token = localStorage.getItem('token');
        if(token) {
            //const newSet = JSON.stringify({
            //    title: this.state.title,
            //    description: this.state.desc,
            //    flash_cards: this.state.flash_cards,
            //});
            
            //const settings = {
            //    method: 'PUT',
            //    headers: { 
            //            'Content-Type': 'application/json',
            //            'Authorization': 'Bearer ' + token,
            //        },
            //    body: newSet,
            //};
            
            // const response = await fetch(API_URL, settings);
            // const json = await response.json();

            window.location.href = "/sets";
        }
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
                        <input 
                            id="set-title" 
                            placeholder="Enter a title..."
                            value={this.state.title}
                            onChange={event => this.setTitle(event.target.value)}
                        />
                        <div className="field-label">TITLE</div>
                    </div>
                    <div className="field-container">
                        <input 
                            id="set-desc" 
                            placeholder="Add a description..."
                            value={this.state.desc}
                            onChange={event => this.setDesc(event.target.value)}
                        />
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
                        return (
                            <CardForm 
                                key={index}
                                delete={this.deleteCard} 
                                clear={this.clearCard} 
                                setTerm={this.setCardTerm}
                                setDef={this.setCardDef}
                                info={this.state.flash_cards[index]}
                                cardNum={index}
                            />
                        );
                    })}
                </div>
                
                <div className="add-card-container" onClick={() => this.addCard(false)}>
                    <div className="add-card">
                        <AddIcon className="add-card-icon"></AddIcon>
                        <div className="add-card-text">Add a card</div>
                    </div>
                </div>

                <div className="submit-container">
                    <div 
                        className="submit-button"
                        onClick={() => this.createSet()}
                    >Create</div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default CreateSet;