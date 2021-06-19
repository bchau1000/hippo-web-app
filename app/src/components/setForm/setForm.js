import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MetaForm from './metaForm/metaForm.js';
import CardForm from './cardForm/cardForm.js';

import './setForm.css';

export default function SetForm(props) {
    const bottom = useRef(null);

    return (
        <div className="set-form-container">
            <div className="sf-header-container">
                <span>{props.header}</span>
            </div>
            <div className="sf-meta-container">
                <MetaForm
                    title={props.title}
                    setTitle={props.setTitle}
                    description={props.description}
                    setDescription={props.setDescription}
                />
            </div>
            <div className="sf-tags-container">

            </div>
            <div className="sf-cards-container">
                <button
                    className="add-card"
                    onClick={() => {
                        props.addCard();

                        bottom.current.scrollIntoView({
                            'behavior': 'smooth'
                        });
                    }}
                >
                    <span className="material-icons">add</span>
                    <span>Add a card</span>
                </button>
                {
                    props.flashCards.map((flashCard, idx) => {
                        return (
                            <CardForm
                                key={flashCard.id}
                                idx={idx}
                                removeCard={props.removeCard}
                                flashCard={flashCard}
                                updateCards={props.updateCards}
                            />
                        );
                    })

                }
                <button
                    className="add-card"
                    onClick={() => props.addCard()}
                >
                    <span className="material-icons">add</span>
                    <span>Add a card</span>
                </button>
            </div>
            <button
                ref={bottom}
                className="sf-submit-button"
                onClick={() => props.submit()}
            >Save</button>
        </div>
    )
}