import React, { useState, useEffect, useCallback } from 'react';
import parseJWT from "components/getUser/getUser.js";
import "./navbar.css";

const API_URL = "http://localhost:9000/api/logout";

export default function Navbar(props) {
    const [awaitResp, setAwaitResp] = useState(false);
    const [user] = useState(parseJWT());

    useEffect(() => {
        if (user)
            console.log("Logged in as: '" + user.username + "'.");
        else
            console.log("User is not currently logged in.")

    }, [user]);

    const sendRequest = useCallback(async () => {
        if (awaitResp)
            return;
        else {
            // Set to true to disable logout button (prevent spam clicking)
            setAwaitResp(true);

            // If a user is even logged in...
            if (user !== null) {
                // Wipe user from local storage
                localStorage.setItem('user', null);

                // Send logout request...
                const body = JSON.stringify({
                    token: user.token,
                });
                const settings = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token,
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
    }, [awaitResp, user]);

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
        <div className="navbar-container">
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
                    loginOptions(user)
                }
            </div>
        </div>
    )
}