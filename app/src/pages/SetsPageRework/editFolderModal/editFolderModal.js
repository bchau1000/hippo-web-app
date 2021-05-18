import { useState, useEffect } from 'react';
import './editFolderModal.css';

export default function EditFolderModal(props) {
    const sets = props.allSets;

    const [selectedSets, setSelectedSets] = useState([]);
    const [filterSets, setFilterSets] = useState(props.allSets);
    
    const [input, setInput] = useState("");

    useEffect(() => {
        setFilterSets(sets.filter((set) => set.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())));
    }, [input, sets]);

    function handleCheck(event) {
        let newSelectedSets = selectedSets.slice();
        
        if (event.target.checked) 
            newSelectedSets.push(JSON.parse(event.target.value));
        else {
            const value = JSON.parse(event.target.value);
            newSelectedSets = newSelectedSets.filter((set) => set.id !== JSON.parse(value.id));
        }
        
        setSelectedSets(newSelectedSets);
    }

    async function handleSubmit(event) { 
    }

    return (
        <div className="edit-folder-modal-container">
            <form action="url" id="edit-folder-modal-form" className="edit-folder-modal-form">
            <div className="edit-folder-modal-input-container">
                    <input
                        type="text"
                        placeholder="Filter sets"
                        onChange={(event) => setInput(event.target.value)}
                    />
                </div>
                <div className="edit-folder-modal-sets">
                    {
                        filterSets.map((set, idx) => {
                            return (
                                <label
                                    className="edit-folder-modal-set-checkbox-wrapper no-select"
                                    htmlFor={"edit-folder-modal-set-checkbox" + idx}
                                    key={idx}
                                >
                                    <span>{set.title}</span>
                                    <input
                                        id={"edit-folder-modal-set-checkbox" + idx}
                                        type="checkbox"
                                        value={JSON.stringify({
                                            "id": set.id,
                                            "title": set.title,
                                            "description": set.description
                                        })}
                                        onChange={(event) => handleCheck(event)}
                                    />
                                </label>
                            )
                        })
                    }
                </div>
                <div className="edit-folder-modal-search-submit">
                    <button
                        className="edit-folder-modal-submit"
                        onClick={(event) => handleSubmit(event)}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}