import { useState, useEffect, useContext } from 'react';
import useViewport from "components/getViewport/getViewport.js";
import SetGridItem from '../setGridItem/setGridItem.js';
import ModalTemplate from 'components/modalTemplate/modalTemplate.js';
import EditFolderModal from 'pages/SetsPageRework/editFolderModal/editFolderModal.js';
import { OwnerContext } from 'pages/SetsPageRework/SetsPageRework.js';

import "./folderCollapsible.css";

export default function FolderCollapsible(props) {
    const width = useViewport();
    const owner = useContext(OwnerContext);
    const [containerHeight, setContainerHeight] = useState('240px');
    const [calcHeight, setCalcHeight] = useState(240);
    const [showFolders, setShowFolders] = useState(props.showFolder);
    const [showEditModal, setShowEditModal] = useState(false);
    const folder = props.folder;

    useEffect(() => {
        let setLen = folder.sets.length;
        if (props.isFolder)
            setLen += 1;

        if (width > 1280)
            // 4 per row
            setCalcHeight(245 * Math.ceil((setLen) / 4));
        else if (width >= 1025 && width <= 1280)
            // 3 per row
            setCalcHeight(245 * Math.ceil((setLen) / 3));
        else if (width >= 550 && width <= 1024)
            // 2 per row
            setCalcHeight(245 * Math.ceil((setLen) / 2));
        else if (width < 550)
            setCalcHeight(245 * setLen);

    }, [props.isFolder, folder, width])

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

    return (
        <div className="folder-collapsible-wrapper">
            <div className="folder-options-container">
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
                {props.isFolder && owner &&
                    <button
                        className="folder-collapsible-delete-button"
                        onClick={() => props.onDeleteFolder(props.folder.id)}
                    >
                        <span className="material-icons">delete</span>
                    </button>
                }
            </div>
            <div
                className={`folder-collapsible-container ${showFolders ? "" : "collapsible-hide"}`}
                style={{ height: containerHeight }}
            >
                <div className="folder-collapsible-position">
                    {
                        folder.sets.map((sets, idx) => {
                            return (sets.id && <SetGridItem
                                key={idx}
                                id={sets.id}
                                title={sets.title}
                                desc={sets.description}
                                onDelete={props.onDelete}
                                onEdit={props.onEdit}
                                onRemove={onRemove}
                                isFolder={props.isFolder}
                            />)
                        })
                    }

                    {props.isFolder && owner &&
                        <button
                            className="add-set-card"
                            onClick={() => setShowEditModal(true)}
                        >
                            <span className="material-icons">edit</span>
                            <span>&nbsp;Edit folder</span>
                        </button>
                    }

                </div>
            </div>
        </div>
    )
}