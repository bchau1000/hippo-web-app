import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import LayersIcon from '@material-ui/icons/Layers';
import DeleteIcon from '@material-ui/icons/Delete';
import './sidebar.css';



export default function Sidebar(props) {
    return (
        <div className="sidebar-container">
            <div className="item">
                <AddIcon className="icon"></AddIcon>
                <a className="text" href="/sets/new">Create</a>
            </div>
            <div className="item">
                <LayersIcon className="icon"></LayersIcon>
                <a className="text" href="/sets">Study Sets</a>
            </div>
            <div className="item">
                <DeleteIcon className="icon"></DeleteIcon>
                <a className="text" href="/sets">Trash</a>
            </div>
        </div>
    );
}