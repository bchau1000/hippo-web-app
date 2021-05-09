import { useState, useEffect } from 'react';
import FolderCollapsible from './folderCollapsible/folderCollapsible.js';
import isOwner from 'components/isOwner/isOwner.js';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';
import ModalTemplate from 'components/modalTemplate/modalTemplate.js';
import AddSetModal from './addSetModal/addSetModal.js';
import "./SetsPageRework.css";

export default function SetsPageRework(props) {
    const username = props.match.params.username;
    const [loading, setLoading] = useState(true);
    const [folders, setFolders] = useState([]);
    const [allSets, setAllSets] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
            json = await response.json();

            if (response.status === 201)
                setFolders(json);

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
                    for(let i = 0; i < len; i++)
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

    //async function onAdd(set_id, folder_id) {
    //}

    if (loading) {
        return (
            <LoadingAnim gridArea={'content'} />
        )
    }

    return (
        <section className="sets-page-container">
            <ModalTemplate
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                width={500}
                height={400}
            >
                <AddSetModal></AddSetModal>
            </ModalTemplate>
            <div className="all-sets-container">
                <FolderCollapsible
                    showFolder={true}
                    showOptions={false}
                    sets={allSets}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onAdd={() => setShowModal(true)}
                />
            </div>
            <div className="all-folders-container">
                {
                    folders.map((folder, idx) => {
                        return <FolderCollapsible
                            key={idx}
                            showOptions={true}
                            showFolder={false}
                            sets={folder.sets}
                            folder={folder}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onAdd={() => setShowModal(true)}
                        />
                    })
                }

            </div>
        </section>
    )
}