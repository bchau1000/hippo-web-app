import React from "react";
import FlashCard from "./flashcard/flashcard.js";
import CardSwiper from "components/cardSwiper/cardSwiper.js";
import "./StudyPage.css";
const API_URL = "http://localhost:9000/api/sets/";

class StudyPage extends React.Component {


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
        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(API_URL + this.state.set_id + "/cards", settings);
        if(response.status === 201) {
            const json = await response.json();
            this.setState({
                title: json.title,
                description: json.description,
                flash_cards: json.flash_cards,
            });
        }
        else {
            console.log(response.status + " status received.");
        }
        
    }

    render() {
        return (
            <section className="study-view-container">
                <span className="study-view-title">{this.state.title}</span>
                <CardSwiper cards={this.state.flash_cards} className="swiper-container" />
                <div className="study-view-cards">
                    {
                        this.state.flash_cards.map((flashcard, index) => (
                            <FlashCard
                                key={index}
                                name={flashcard.term}
                                desc={flashcard.definition}
                            />
                        ))
                    }
                </div>
            </section>
        );
    }
}

export default StudyPage;