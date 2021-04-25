import React from 'react';
import "./navbar.css";

function logout() {
    localStorage.clear();
}

export default function Navbar(props) {
    return (
        <div className="navbar-container">
            <div className="left">
                <div className="dropdown" onClick={() => {props.onClick()}}>
                    <span className="material-icons">reorder</span>
                </div>
                <div className="title">
                    <a href="/">Hippo</a>
                </div>
                
            </div>
            <div className="right">
                <a href="/" className="button">
                    <span>Login</span>
                </a>
                <a className="button" href="/" onClick={() => logout()}>
                    <span>Logout(Test)</span>
                </a>
            </div>
        </div>
    )
}