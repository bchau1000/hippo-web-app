import React from 'react';
import "./navbar.css";

export default function Navbar(props){
    return (
        <div className="navbar-container">
            <div className="left">
                <div className="title">
                    <a href="/dashboard">StudyBuddy</a>
                </div>
                <div className="button">
                    <a href="/dashboard">Home</a>
                </div>
                <div className="button">
                    <a href="/dashboard">Dashboard</a>
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