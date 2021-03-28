import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import LayersIcon from '@material-ui/icons/Layers';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import './sidebar.css';



export default function Sidebar(props) {

    function onClick(text) {
        console.log(text)
    }

    return (
        <div className="sidebar-container">
            <div className="item" onClick={() => onClick("hello")}>
                <AddIcon className="icon"></AddIcon>
                <div className="text">Create</div>
            </div>
            <div className="item">
                <LayersIcon className="icon"></LayersIcon>
                <div className="text">Study Sets</div>
            </div>
            <div className="item">
                <DeleteIcon className="icon"></DeleteIcon>
                <div className="text">Trash</div>
            </div>
        </div>
    );
}