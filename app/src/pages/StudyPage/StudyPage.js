import {useState, useEffect} from "react";
import FlashCard from "./flashcard/flashcard.js";
import CardSwiper from "components/cardSwiper/cardSwiper.js";
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import "./StudyPage.css";

const API_URL = "/api/sets/";

export default function StudyPage(props) {
    const set_id = props.match.params.set_id;
    const [title, setTitle] = useState("");
    //const [desc, setDesc] = useState("");
    const [flashCards, setFlashCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const settings = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await fetch(API_URL + set_id + "/cards", settings);
            if (response.status === 201) {
                const json = await response.json();
                setTitle(json.title);
                //setDesc(json.desc);
                setFlashCards(json.flash_cards);
            }
            else {
                console.log(response.status + " status received.");
            }
            setLoading(false);
        }
        getData();
    }, [set_id])

    if(loading) {
        return(
            <LoadingAnim gridArea={"content"}/>
        );
    }

    return (
        <section className="study-view-container">
            <span className="study-view-title">{title}</span>
            <CardSwiper cards={flashCards} className="swiper-container" />
            <div className="study-view-cards">
                {
                    flashCards.map((flashCard, index) => (
                        <FlashCard
                            key={index}
                            name={flashCard.term}
                            definition={flashCard.definition}
                        />
                    ))
                }
            </div>
        </section>
    );
}