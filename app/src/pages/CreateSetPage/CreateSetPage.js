import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotificationContext } from 'context/context.js';
import SetForm from 'components/setForm/setForm.js';
import { useHistory } from "react-router-dom";
import './CreateSetPage.css';

export default function CreateSetPage(props) {
    const [flashCards, setFlashCards] = useState([{
        'id': uuidv4(),
        'term': '<p></p>',
        'definition': '<p></p>',
        'plainText': '',
    },
        {
            'id': uuidv4(),
            'term': '<p></p>',
            'definition': '<p></p>',
            'plainText': '',
        }]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    const notifications = useContext(NotificationContext);

    function notify(type, text, status) {
        notifications({
            type: type,
            value: {
                id: uuidv4(),
                text: text,
                status: status,
            }
        });
    }

    const createSet = async () => {
        if (title.length) {
            const body = JSON.stringify({
                'title': title,
                'description': description,
                'flash_cards': flashCards.filter((flashCard) => flashCard.plainText.length),
            });

            const settings = {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body,
            }

            const response = await fetch('/api/sets/new', settings);

            if (response.status === 201) {
                const json = await response.json();
                history.push('/' + json.user + '/sets');
                notify('ADD', 'New set created!', 'Success');
            }
        }
        else
            notify('ADD', 'You must provide a title for the study set.', 'Error');
    }

    const updateCards = (idx, flashCard) => {
        let newFlashCards = flashCards.slice();
        newFlashCards[idx] = flashCard;
        setFlashCards(newFlashCards);
    }

    const addCard = () => {
        let newFlashCards = flashCards.slice();
        newFlashCards.push({
            'id': uuidv4(),
            'term': '<p></p>',
            'definition': '<p></p>',
            'plainText': '',
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

    return (
        <section className="create-set-page-wrapper">
            <SetForm
                header={"Create a new set"}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                flashCards={flashCards}
                updateCards={updateCards}
                addCard={addCard}
                removeCard={removeCard}
                submit={createSet}
            />
        </section>
    )
}