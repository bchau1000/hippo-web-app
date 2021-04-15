import React from "react";
import FlashCard from "./flashcard/flashcard.js";
import "./StudyView.css";
const API_URL = "http://localhost:9000/api/sets/";

class StudyView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            set_id: this.props.match.params.id,
            title: "",
            description: "",
            flash_cards: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    async componentDidMount() {
        const token = localStorage.getItem('token');

        if(token) {
            const settings = {
                method: 'GET',
                headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                },
            }
            const response = await fetch(API_URL + this.state.set_id + "/cards", settings);
            const data = await response.json();
            this.setState({
                title: data.title,
                description: data.description,
                flash_cards: data.flash_cards,
            });
        }
        else {
            window.location.href = "/login";
        }
    }

    render() {
        return (
            <div id="study-view-container">
                <span id="title">{this.state.title}</span>
                <span id="description">{this.state.description}</span>
                {
                    this.state.flash_cards.map((flashcard, index) => (
                        <FlashCard
                            key={index}
                            name={flashcard.term}
                            desc={flashcard.defintion}
                        />
                    ))
                }
            </div>
        );
    }
}

export default StudyView;