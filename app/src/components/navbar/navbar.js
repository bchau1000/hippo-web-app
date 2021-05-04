import React, { useState, useEffect, useCallback } from 'react';
import "./navbar.css";

const API_URL = "/api/logout";

export default function Navbar(props) {
    const [awaitResp, setAwaitResp] = useState(false);

    useEffect(() => {
        console.log(props.user);
    }, []);

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
                if (response.status === 200) {
                    //const json = await response.json();
                }

                setAwaitResp(false);
            }
        }
    }, [awaitResp, props.user]);

    function loginOptions(user) {
        if (user === null) {
            return (
                <a href="/login" className="button">
                    <span>Login</span>
                </a>
            );
        }
        else {
            return (
                <a className="button" disabled={awaitResp} href="/" onClick={sendRequest}>
                    <span>Logout</span>
                </a>
            );
        }
    }

    return (
        <div className="navbar-container no-select">
            <div className="left">
                <div className="dropdown" onClick={() => { props.onClick() }}>
                    {
                        props.showDropdown
                            ? <span className="material-icons">close</span>
                            : <span className="material-icons">reorder</span>
                    }
                </div>
                <div className="title">
                    <a href="/">Hippo.</a>
                </div>

            </div>
            <div className="right">
                {
                    loginOptions(props.user)
                }
                <a className="button" href="/" onClick={() => localStorage.clear()}>
                    <span >Clear</span>
                </a>
            </div>
        </div>
    )
}