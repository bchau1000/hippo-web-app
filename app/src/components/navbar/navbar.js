import React from 'react';
import "./navbar.css";
import ListIcon from '@material-ui/icons/List';

export default function Navbar(props) {
    return (
        <div className="navbar-container">
            <div className="left">
                <div className="dropdown" onClick={() => {props.onClick()}}>
                    <span class="material-icons">reorder</span>
                </div>
                <div className="title">
                    <a href="/sets">StudyBuddy</a>
                </div>
                
            </div>
            <div className="right">
                <div className="button">
                    <a href="/login">Logout</a>
                </div>
            </div>
        </div>
    )

}