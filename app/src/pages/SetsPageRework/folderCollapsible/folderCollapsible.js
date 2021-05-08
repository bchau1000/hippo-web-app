import { useState, useEffect } from 'react';
import useViewport from "components/getViewport/getViewport.js";
import SetGridItem from '../setGridItem/setGridItem.js';

import "./folderCollapsible.css";

export default function FolderCollapsible(props) {
    const width = useViewport();
    const [containerHeight, setContainerHeight] = useState('240px');
    const [calcHeight, setCalcHeight] = useState(240);
    const [showFolders, setShowFolders] = useState(props.showFolder);
    const folderId = props.folderId;
    const sets = props.sets;

    useEffect(() => {
        if (width > 1280)
            // 4 per row
            setCalcHeight(245 * Math.ceil((sets.length + 1) / 4));
        else if (width >= 1025 && width <= 1280)
            // 3 per row
            setCalcHeight(245 * Math.ceil((sets.length + 1) / 3));
        else if (width >= 550 && width <= 1024)
            // 2 per row
            setCalcHeight(245 * Math.ceil((sets.length + 1) / 2));
        else if (width < 550)
            setCalcHeight(245 * sets.length);

    }, [width])

    useEffect(() => {
        if (showFolders)
            setContainerHeight(calcHeight);
        else
            setContainerHeight('0px');

    }, [calcHeight, showFolders]);

    return (
        <div className="folder-collapsible-wrapper">
            <button
                className="folder-collapsible-button"
                onClick={() => setShowFolders(current => !current)}
            >
                <span className={
                    `material-icons 
                        ${showFolders ?
                        "expand-button expand-flipped" :
                        "expand-button"
                    }`
                }
                >
                    expand_more
                </span>
                <span>All</span>
                <span></span>
            </button>

            <div
                className={`folder-collapsible-container ${showFolders ? "" : "collapsible-hide"}`}
                style={{ height: containerHeight }}
            >
                <div className="folder-collapsible-position">
                    {
                        sets.map((sets, idx) => {
                            return (<SetGridItem
                                key={idx}
                                id={sets.id}
                                title={sets.title}
                                desc={sets.description}
                                onDelete={props.onDelete}
                                onEdit={props.onEdit}
                            />)
                        })
                    }

                    <button
                        className="add-set-card"
                        onClick={() => props.onAdd()}
                    >
                        <span className="material-icons">add</span>
                        <span>Add to folder</span>
                    </button>
                </div>
            </div>
        </div>
    )
}