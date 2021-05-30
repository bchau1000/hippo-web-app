import { useState, useEffect } from 'react';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import SetForm from 'components/setForm/setForm.js';

import './EditSetPage.css';

export default function EditSetPage(props) {
    const set_id = props.match.params.set_id;
    const [flashCards, setFlashCards] = useState(new Array(2).fill({
        'term': '<p></p>',
        'definition': '<p></p>',
        'plainText': '',
    }));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const settings = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch('/api/sets/' + set_id + '/cards', settings);

            if(response.status === 201) {
                const json = await response.json();
                setFlashCards(json.flash_cards);
                setTitle(json.title);
                setDescription(json.description);
            }

            setLoading(false);
        }

        getData();
    }, []);

    const editSet = async () => {
        // implement this
        console.log('working');

    }

    const updateCards = (idx, flashCard) => {
        let newFlashCards = flashCards.slice();
        newFlashCards[idx] = flashCard;
        setFlashCards(newFlashCards);
    }

    const addCard = () => {
        let newFlashCards = flashCards.slice();
        newFlashCards.push({
            'term': '<p></p>',
            'definition': '<p></p>'
        });

        setFlashCards(newFlashCards);
    }

    const removeCard = (idx) => {
        if (flashCards.length > 2) {
            let newFlashCards = flashCards.slice();
            newFlashCards.splice(idx, 1);
            setFlashCards(newFlashCards);
        }
    }

    if (loading) {
        return (
            <LoadingAnim gridArea={"content"} />
        );
    }

    return (
        <section className="edit-set-page-wrapper">
            <SetForm
                header={"Editing '" + title + "'"}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                flashCards={flashCards}
                updateCards={updateCards}
                addCard={addCard}
                removeCard={removeCard}
                submit={editSet}
            />
        </section>
    )
}