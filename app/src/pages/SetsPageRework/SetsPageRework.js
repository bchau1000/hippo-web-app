import { useState, useEffect, useRef, useContext, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { isOwner, isOwnerSet, isOwnerFolder } from 'components/isOwner/isOwner.js';

import FolderCollapsible from './folderCollapsible/folderCollapsible.js';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import ModalTemplate from 'components/modalTemplate/modalTemplate.js';
import AddFolderModal from './addFolderModal/addFolderModal.js';

import { NotificationContext } from 'context/context.js';

import "./SetsPageRework.css";

export const OwnerContext = createContext(false);

export default function SetsPageRework(props) {
    const username = props.match.params.username;
    const [owner, setOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [folders, setFolders] = useState([]);
    const [allSets, setAllSets] = useState([]);
    const [showFolderModal, setShowFolderModal] = useState(false);
    const history = useHistory();
    const bottomOfPage = useRef();
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

    async function onDelete(set_id) {
        if (await isOwnerSet(set_id)) {
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
                notify('ADD', 'You must be the owner of this set to delete it', 'Error');

        }
    }

    async function onRemove(event, set_id) {
        event.stopPropagation();
        console.log(set_id);
    }

    async function onEdit(event, set_id) {
        event.stopPropagation(); // Stops parent onClick

        if (await isOwnerSet(set_id))
            history.push("/sets/" + set_id + "/edit");
        else
            notify('ADD', 'You must be the owner of this set to edit/delete it.', 'Error');
    }

    const onDeleteFolder = async (folder_id) => {
        if (await isOwnerFolder(folder_id)) {
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
                notify('ADD', 'Folder successfully deleted', 'Success');
            }

        }
        else
            notify('ADD', 'You must be the owner of this folder to edit/delete it', 'Error');
        
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
        else
            notify('ADD', 'You must be the owner of this folder to edit/delete it', 'Error');
    }

    if (loading) {
        return (
            <LoadingAnim gridArea={'content'} />
        )
    }

    return (
        <OwnerContext.Provider value={owner}>
            <section className="sets-page-container">
                <div style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '15px' }}>
                    {owner
                        ? <span>My Sets</span>
                        : <span>{username[0].toUpperCase() + username.substring(1)}'s Sets</span>
                    }
                </div>

                {showFolderModal &&
                    <ModalTemplate
                        showModal={showFolderModal}
                        closeModal={() => setShowFolderModal(false)}
                    >
                        <AddFolderModal
                            allSets={allSets}
                            insertFolder={insertFolder}
                            showModal={setShowFolderModal}
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

                <div className="all-folders-container">
                    {
                        folders.map((folder, idx) => {
                            return (
                                <FolderCollapsible
                                    key={idx}
                                    isFolder={true}
                                    showFolder={false}
                                    folder={folder}
                                    onDeleteFolder={onDeleteFolder}
                                    onEditFolder={onEditFolder}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                    allSets={allSets}
                                />)
                        })
                    }
                </div>

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

                <div ref={bottomOfPage}></div>
            </section>
        </OwnerContext.Provider>
    )
}