import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useViewport from "hooks/useViewport.js";
import SetGridItem from '../setGridItem/setGridItem.js';
import ModalTemplate from 'components/modalTemplate/modalTemplate.js';
import EditFolderModal from 'pages/SetsPageRework/editFolderModal/editFolderModal.js';
import ConfirmModal from 'components/confirmModal/confirmModal.js';
import { OwnerContext } from 'pages/SetsPageRework/SetsPageRework.js';

import "./folderCollapsible.css";

export default function FolderCollapsible(props) {
    const width = useViewport();
    const owner = useContext(OwnerContext);
    const itemHeight = 170;
    const [containerHeight, setContainerHeight] = useState(itemHeight + 'px');
    const [calcHeight, setCalcHeight] = useState(itemHeight);
    const [showFolders, setShowFolders] = useState(props.showFolder);
    const [showEditModal, setShowEditModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const folder = props.folder;

    useEffect(() => {
        if(confirm){
            setConfirm(null);
            props.onDeleteFolder(props.folder.id);
        }
    }, [confirm]);

    useEffect(() => {
        let setLen = folder.sets.length;

        if (owner)
            setLen += 1;

        if (width > 1280)
            // 4 per row
            setCalcHeight((itemHeight * Math.ceil((setLen) / 4)) + 20);
        else if (width >= 1025 && width <= 1280)
            // 3 per row
            setCalcHeight((itemHeight * Math.ceil((setLen) / 3)) + 20);
        else if (width >= 550 && width <= 1024)
            // 2 per row
            setCalcHeight((itemHeight * Math.ceil((setLen) / 2)) + 20);
        else if (width < 550)
            setCalcHeight((itemHeight * setLen) + 20);

    }, [props.isFolder, folder, width, owner])

    useEffect(() => {
        if (showFolders)
            setContainerHeight(calcHeight);
        else
            setContainerHeight('0px');

    }, [calcHeight, showFolders]);

    const onRemove = (event, setId) => {
        event.stopPropagation();
        const newSets = folder.sets.filter((set) => set.id !== setId);
        props.onEditFolder(null, folder, newSets);
    }

    const showAddCard = () => {
        if (!props.isFolder)
            return (
                <Link
                    className="add-set-card"
                    to={"/sets/new"}
                >
                    <span className="material-icons">add</span>
                    <span>&nbsp;Create</span>
                </Link>
            )
        else
            return (
                <button
                    className="add-set-card"
                    onClick={() => setShowEditModal(true)}
                >
                    <span className="material-icons">edit</span>
                    <span>&nbsp;Edit folder</span>
                </button>
            )
    }

    return (
        <div className="folder-collapsible-wrapper">
            <div className="folder-options-container">
                <ConfirmModal
                    state={[modal, setModal]}
                    setConfirm={setConfirm}
                    header={"Confirm"}
                    text={"Are you sure you want to delete this folder? Deleting this folder will NOT delete the sets within it."}
                />
                {
                    showEditModal &&
                    <ModalTemplate

                        showModal={showEditModal}
                        closeModal={() => setShowEditModal(false)}
                    >
                        <EditFolderModal
                            allSets={props.allSets}
                            folder={folder}
                            onEditFolder={props.onEditFolder}
                            setShowEditModal={() => setShowEditModal(false)}
                        />
                    </ModalTemplate>
                }
                <button
                    className="folder-collapsible-button"
                    onClick={() => setShowFolders(current => !current)}
                >
                    <span
                        className={
                            `material-icons 
                            ${showFolders
                                ? "expand-button expand-flipped"
                                : "expand-button"
                            }
                        `
                        }
                    >
                        expand_more
                </span>
                    <span>
                        {props.folder
                            ? props.folder.name
                            : "All"
                        }
                    </span>
                </button>

                <div>
                    {props.isFolder && owner &&
                        <button
                            className="folder-collapsible-delete-button"
                            onClick={() => {
                                setModal(true);
                            }}
                        >
                            <span className="material-icons">delete</span>
                        </button>
                    }
                </div>
            </div>
            <div
                className={`folder-collapsible-container ${showFolders ? "collapsible-show" : "collapsible-hide"}`}
                style={{ height: containerHeight }}
            >
                <div className="folder-collapsible-position">
                    {
                        folder.sets.map((sets, idx) => {
                            return (
                                sets.id &&
                                <SetGridItem
                                    key={idx}
                                    id={sets.id}
                                    title={sets.title}
                                    desc={sets.description}
                                    tags={sets.tags}
                                    username={sets.username}
                                    onDelete={props.onDelete}
                                    onEdit={props.onEdit}
                                    onRemove={onRemove}
                                    isFolder={props.isFolder}
                                />)
                        })
                    }

                    {owner && showAddCard()

                    }

                </div>
            </div>
        </div>
    )
}