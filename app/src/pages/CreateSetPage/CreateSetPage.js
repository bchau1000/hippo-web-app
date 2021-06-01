import { useState, useEffect } from 'react';
import SetForm from 'components/setForm/setForm.js';
import './CreateSetPage.css';

export default function CreateSetPage(props) {
    const [flashCards, setFlashCards] = useState(new Array(2).fill({ 
        'term': '<p></p>', 
        'definition': '<p></p>',
        'plainText': '',
    }));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        
    }, []);

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
                window.location.href = "/" + json.user + "/sets";
            }
        }
        else {
            
        }

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