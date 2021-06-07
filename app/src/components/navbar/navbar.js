import React, { useState, useEffect, useCallback } from 'react';
import "./navbar.css";

const API_URL = "/api/logout";

export default function Navbar(props) {
    const [awaitResp, setAwaitResp] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const width = props.width;

    useEffect(() => {
        if (width <= 1025)
            setShowButton(true);
        else
            setShowButton(false);
    }, [width]);

    const sendRequest = useCallback(async () => {
        if (awaitResp)
            return;
        else {
            // Set to true to disable logout button (prevent spam clicking)
            setAwaitResp(true);

            // If a user is even logged in...
            if (props.user !== null) {
                // Wipe user from local storage
                localStorage.setItem('user', null);

                // Send logout request...
                const body = JSON.stringify({
                });
                const settings = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body,
                };
                const response = await fetch(API_URL, settings);
                if (response.status === 201) {
                    const json = await response.json();
                    console.log(json);
                }

                setAwaitResp(false);
            }
        }
    }, [awaitResp, props.user]);

    return (
        <div 
            className={`navbar-container no-select ${props.showDropdown && width > 1025 ? "add-margin" : "rem-margin"}`}
        >
            <div className="left">
                <div className="dropdown" onClick={() => { props.onClick() }}>
                    {
                        props.showDropdown
                            ? <span className="material-icons">close</span>
                            : <span className="material-icons">reorder</span>
                    }
                </div>
            </div>
            <div className="right">
            </div>
        </div>
    )
}