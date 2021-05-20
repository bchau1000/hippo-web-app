import { useState, useEffect, useRef, createContext } from 'react';
import { isOwner, isOwnerSet, isOwnerFolder } from 'components/isOwner/isOwner.js';

import FolderCollapsible from './folderCollapsible/folderCollapsible.js';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import ModalTemplate from 'components/modalTemplate/modalTemplate.js';
import AddFolderModal from './addFolderModal/addFolderModal.js';

import "./SetsPageRework.css";

export const OwnerContext = createContext(false);

export default function SetsPageRework(props) {
    const username = props.match.params.username;
    const [owner, setOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [folders, setFolders] = useState([]);
    const [allSets, setAllSets] = useState([]);
    const [showFolderModal, setShowFolderModal] = useState(false);
    
    const bottomOfPage = useRef();

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const settings = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            let response = await fetch('/api/' + username + '/sets', settings);
            let json = await response.json();

            if (response.status === 201)
                setAllSets(json);
            else
                console.log(json);

            response = await fetch('/api/' + username + '/folders', settings);

            if (response.status === 201) {
                json = await response.json();
                setFolders(json);
                
            }
            if (await isOwner(username))
                setOwner(true);

            setLoading(false);
        }
        getData();
    }, [username]);

    async function onDelete(event, set_id) {
        event.stopPropagation(); // Stops parent onClick
        if (await isOwnerSet(set_id)) {
            const confirm = window.confirm(
                "Are you sure you want to delete this set? This action cannot be undone."
            );

            if (confirm) {
                const body = JSON.stringify({
                    'set_id': set_id,
                });

                const settings = {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body,
                };

                const response = await fetch('/api/sets/delete', settings);
                if (response.status === 201) {
                    const len = folders.length;
                    let newFolders = folders.slice();
                    for (let i = 0; i < len; i++)
                        newFolders[i].sets = newFolders[i].sets.filter(set => set.id !== set_id);

                    setFolders(newFolders);
                    setAllSets(allSets.filter(set => set.id !== set_id));
                }
                else if (response.status === 401)
                    alert('You must be the owner of this set to edit/delete it.');
            }
        }
        else
            alert('You must be the owner of this set to edit/delete it.');
    }

    async function onRemove(event, set_id) {
        event.stopPropagation();
        console.log(set_id);
    }

    async function onEdit(event, set_id) {
        event.stopPropagation(); // Stops parent onClick

        if (await isOwnerSet(set_id))
            window.location.href = "/sets/" + set_id + "/edit";
        else
            alert('You must be the owner of this set to edit/delete it.');
    }

    const onDeleteFolder = async (folder_id) => {
        if (await isOwnerFolder(folder_id)) {
            const confirm = window.confirm(
                "Are you sure you want to delete this folder? Deleting the folder will NOT delete the sets within it."
            );
            if (confirm) {
                const body = JSON.stringify({
                    "folder_id": folder_id,
                });

                const settings = {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body,
                }

                const response = await fetch('/api/folders/delete', settings);

                if (response.status === 201) {
                    let newFolders = folders.slice();
                    setFolders(newFolders.filter(folder => folder.id !== folder_id));
                }
            }
        }
        else
            alert('You must be the owner of this folder to delete it.');
    }

    const insertFolder = (newFolder) => {
        let updatedFolders = folders.slice();
        updatedFolders.push(newFolder);

        setFolders(updatedFolders);
        setShowFolderModal(false);
        bottomOfPage.current.scrollIntoView({ behavior: 'smooth' });
    }

    const onEditFolder = async (event, folder, newSets) => {
        if (await isOwnerFolder(folder.id)) {
            if (event)
                event.preventDefault();

            newSets = newSets.filter((set) => set.id !== null);

            const body = JSON.stringify({
                "id": folder.id,
                "name": folder.name,
                "sets": newSets
            })

            const settings = {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body,
            }
            const response = await fetch("/api/folders/edit", settings);

            if (response.status === 201) {
                const updatedFolder = JSON.parse(body);
                let newFolders = folders.slice();
                let i = 0;
                let found = false;
                const length = newFolders.length;

                while (i < length && !found) {
                    if (newFolders[i].id === updatedFolder.id) {
                        newFolders[i] = updatedFolder;
                        found = true;
                    }
                    i++;
                }

                setFolders(newFolders);
            }
        }
        else {
            alert('You must be the owner of this folder to delete it.');
        }
    }

    if (loading) {
        return (
            <LoadingAnim gridArea={'content'} />
        )
    }

    return (
        <OwnerContext.Provider value={owner}>
            <section className="sets-page-container">
                {showFolderModal &&
                    <ModalTemplate
                        showModal={showFolderModal}
                        closeModal={() => setShowFolderModal(false)}
                    >
                        <AddFolderModal
                            allSets={allSets}
                            insertFolder={insertFolder}
                        />
                    </ModalTemplate>
                }
                {owner &&
                    <div className="sets-buttons-container">
                        <button onClick={() => setShowFolderModal(true)}>
                            <span className="material-icons">
                                create_new_folder
                    </span>
                            <span>New Folder</span>
                        </button>
                    </div>

                }

                <div className="all-sets-container">
                    <FolderCollapsible
                        isFolder={false}
                        showFolder={true}
                        folder={{ "name": "All", "sets": allSets }}
                        onDeleteFolder={onDeleteFolder}
                        onEditFolder={onEditFolder}
                        onDelete={onDelete}
                        onRemove={onRemove}
                        onEdit={onEdit}
                        allSets={allSets}
                    />
                </div>
                <div className="all-folders-container">
                    {
                        folders.map((folder, idx) => {
                            return <FolderCollapsible
                                key={idx}
                                isFolder={true}
                                showFolder={false}
                                folder={folder}
                                onDeleteFolder={onDeleteFolder}
                                onEditFolder={onEditFolder}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                allSets={allSets}
                            />
                        })
                    }
                </div>
                <div ref={bottomOfPage}></div>
            </section>
        </OwnerContext.Provider>
    )
}