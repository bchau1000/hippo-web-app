import React from 'react';
import "./navbar.css";

export default function Navbar(props){
    return (
        <div className="navbar-container">
            <div className="left">
                <div className="title">
                    <a href="/sets">StudyBuddy</a>
                </div>
                <div className="button">
                    <a href="/sets">Home</a>
                </div>
                <div className="button">
                    <a href="/sets">Dashboard</a>
                </div>
            </div>
            <div className="right">
                <div className="button">
                    <a href="/login">Logout</a>
                </div>
            </div>
        </div>
    );

}