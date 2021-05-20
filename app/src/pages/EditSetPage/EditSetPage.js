import { useState, useEffect } from 'react';
import CardForm from 'components/cardForm/cardForm.js';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import { isOwnerSet } from 'components/isOwner/isOwner.js';
import AddIcon from '@material-ui/icons/Add';
import './EditSetPage.css';
import { Card } from '@material-ui/core';

export default function EditSetPage(props) {
    const set_id = props.match.params.set_id;
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [flashCards, setFlashCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getCards() {
            setLoading(true);
            if (!(await isOwnerSet(set_id)))
                window.history.back();
            else {
                const settings = {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }

                const response = await fetch('/api/sets/' + set_id + '/cards', settings);
                const json = await response.json();
                if (response.status === 201) {
                    setTitle(json.title);
                    setDesc(json.description);
                    setFlashCards(json.flash_cards);
                }
                else {
                    console.log(json);
                }
                setLoading(false);
            }
        }
        getCards();

    }, [set_id]);

    useEffect(() => {
        console.log(flashCards);
    }, [flashCards]);

    if (loading) {
        return (
            <LoadingAnim gridArea={"content"} />
        );
    }

    return (
        <section className="edit-set-container">
            <div className="create-container">
                <form className="meta-form">

                    <div className="header">
                        Edit Set: "{title}"
                    </div>

                    <div className="field-container">
                        <input
                            id="set-title"
                            placeholder="Enter a title..."
                            value={title}
                            onChange={event => { setTitle(event.target.value) }}
                        />
                        <div className="field-label">TITLE</div>
                    </div>

                    <div className="field-container">
                        <input
                            id="set-desc"
                            placeholder="Add a description..."
                            value={desc}
                            onChange={event => { setDesc(event.target.value) }}
                        />
                        <div className="field-label">DESCRIPTION</div>
                    </div>

                </form>

                <div className="add-card-container" onClick={() => {/*this.addCard(true)*/ }}>
                    <div className="add-card">
                        <AddIcon className="add-card-icon"></AddIcon>
                        <div className="add-card-text">Add a card</div>
                    </div>
                </div>

                <div className="center-container">
                    {flashCards.map((flashCard, idx) => {
                        return (
                            <CardForm
                                info={flashCard}
                            />
                        );
                    })}
                </div>

                <div className="add-card-container" onClick={() => {/*this.addCard(false)*/ }}>
                    <div className="add-card">
                        <AddIcon className="add-card-icon"></AddIcon>
                        <div className="add-card-text">Add a card</div>
                    </div>
                </div>

                <div className="submit-container">
                    <div
                        className="submit-button"
                        onClick={() => {/*this.createSet()*/ }}
                    >Save</div>
                </div>
                <div></div>
            </div>
        </section>
    );
}