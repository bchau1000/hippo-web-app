import { useState, useEffect, useRef } from 'react';
import FolderCollapsible from './folderCollapsible/folderCollapsible.js';
import isOwner from 'components/isOwner/isOwner.js';
import isOwnerFolder from 'components/isOwner/isOwnerFolder.js';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import ModalTemplate from 'components/modalTemplate/modalTemplate.js';
import AddFolderModal from './addFolderModal/addFolderModal.js';

import "./SetsPageRework.css";

export default function SetsPageRework(props) {
    const username = props.match.params.username;
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

            setLoading(false);
        }
        getData();
    }, [username]);

    async function onDelete(event, set_id) {
        event.stopPropagation(); // Stops parent onClick
        if (await isOwner(set_id)) {
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

    async function onEdit(event, set_id) {
        event.stopPropagation(); // Stops parent onClick

        if (await isOwner(set_id))
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
    
    const onEditFolder = (folder_id, sets) => {

    }

    if (loading) {
        return (
            <LoadingAnim gridArea={'content'} />
        )
    }

    return (
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


            <div className="sets-buttons-container">
                <button onClick={() => setShowFolderModal(true)}>
                    <span className="material-icons">
                        create_new_folder
                    </span>
                    <span>New Folder</span>
                </button>
            </div>
            <div className="all-sets-container">
                <FolderCollapsible
                    showFolder={true}
                    showOptions={false}
                    folder={{ "name": "All", "sets": allSets }}
                    onDeleteFolder={onDeleteFolder}
                    onEditFolder={onEditFolder}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    allSets={allSets}
                />
            </div>
            <div className="all-folders-container">
                {
                    folders.map((folder, idx) => {
                        return <FolderCollapsible
                            key={idx}
                            showOptions={true}
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
    )
}