import { useState, useEffect } from 'react';
import './addFolderModal.css';

export default function AddFolderModal(props) {
    const [folderName, setFolderName] = useState("");
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
        else{
            const value = JSON.parse(event.target.value);
            newSelectedSets = newSelectedSets.filter((set) => set.id !== JSON.parse(value.id));
        }

        setSelectedSets(newSelectedSets);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (folderName) {
            const body = JSON.stringify({
                "name": folderName,
                "sets": selectedSets
            });

            const settings = {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }

            const response = await fetch("/api/folders/new", settings);
            if (response.status === 201) {
                const newFolder = {
                    "name": folderName,
                    "sets": selectedSets
                }
                setFolderName("");
                setSelectedSets("");
                setInput("");
                props.insertFolder(newFolder);
            }
        }
        else {
            // TO DO: replace alerts with notifications (custom?)
            alert('You must provide a name for the folder');
        }
    }

    return (
        <div className="folder-modal-container">
            <form action="url" id="folder-modal-form" className="folder-modal-form">
                <div className="folder-modal-input-container">
                    <input
                        type="text"
                        placeholder="Folder name"
                        onChange={(event) => setFolderName(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Filter sets"
                        onChange={(event) => setInput(event.target.value)}
                    />
                </div>
                <div className="folder-modal-sets">
                    {
                        filterSets.map((set, idx) => {
                            return (
                                <label
                                    className="folder-modal-set-checkbox-wrapper no-select"
                                    htmlFor={"folder-modal-set-checkbox" + idx}
                                    key={idx}
                                >
                                    <span>{set.title}</span>
                                    <input
                                        id={"folder-modal-set-checkbox" + idx}
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
                <div className="folder-modal-search-submit">
                    <button
                        className="folder-modal-submit"
                        onClick={(event) => handleSubmit(event)}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}