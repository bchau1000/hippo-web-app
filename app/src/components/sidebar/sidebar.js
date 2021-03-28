import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import LayersIcon from '@material-ui/icons/Layers';
import DeleteIcon from '@material-ui/icons/Delete';
import './sidebar.css';



export default function Sidebar(props) {
    return (
        <div className="sidebar-container">
            <div className="item" onClick={props.clickCreate}>
                <AddIcon className="icon"></AddIcon>
                <div className="text">Create</div>
            </div>
            <div className="item" onClick={props.clickSet}>
                <LayersIcon className="icon"></LayersIcon>
                <div className="text">Study Sets</div>
            </div>
            <div className="item" onClick={props.onClick}>
                <DeleteIcon className="icon"></DeleteIcon>
                <div className="text">Trash</div>
            </div>
        </div>
    );
}