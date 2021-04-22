import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import LayersIcon from '@material-ui/icons/Layers';
import DeleteIcon from '@material-ui/icons/Delete';
import './sidebar.css';

function handleClick(path) {
    window.location.href = path;
}

export default function Sidebar(props) {
    return (
        <div className="sidebar-container">
            <div className="sidebar-collapse">
                
            </div>
            <ul className="sidebar-items-container">
                <li className="sidebar-item" onClick={() => handleClick("")}>
                    <span class="material-icons">search</span>
                    <text for="home">BROWSE</text>
                </li>
                <li className="sidebar-item" onClick={() => handleClick("/sets")}>
                    <span class="material-icons">layers</span>
                    <text for="sets">SETS</text>
                </li>
                <li className="sidebar-item" onClick={() => handleClick("/sets/new")}>
                    <span class="material-icons">library_add</span>
                    <text for="create">CREATE</text>
                </li>
                <li class="sidebar-item" onClick={() => handleClick("/settings")}>
                    <span class="material-icons">settings</span>
                    <text for="settings">SETTINGS</text>
                </li>
            </ul>
        </div>
    );
}