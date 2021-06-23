import { useState, useEffect } from 'react';
import FlashCard from './flashCard/flashCard.js';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import Carousel from 'components/carousel/carousel.js';
import './StudyPage.css';

export default function StudyPage(props) {
    const set_id = props.match.params.set_id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [flashCards, setFlashCards] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        console.log(description)
    }, [description]);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const settings = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await fetch('/api/sets/' + set_id + "/cards", settings);
            if (response.status === 201) {
                const json = await response.json();
                
                setTitle(json.title);
                setDescription(json.description);
                setFlashCards(json.flash_cards);
            }
            setLoading(false);
        }
        getData();
    }, []);

    if (loading)
        return (
            <LoadingAnim
                gridArea={"content"}
            />
        )


    return (
        <section className="study-page-wrapper">
            <div className="study-page-container">
                <div className="sp-header-container">
                    <span>Studying: {title}</span>
                </div>
                <div className="sp-center-container">
                    <Carousel
                        flashCards = {flashCards}
                    />
                </div>
                <div className="sp-cards-container">
                    {
                        flashCards.map((flashCard, idx) => {
                            return (
                                <FlashCard
                                    key={idx}
                                    term={flashCard.term}
                                    definition={flashCard.definition}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
}