import React, { useState, useEffect, useCallback} from 'react';
import parseJWT from "../authUser/authUser.js";
import "./navbar.css";

const API_URL = "http://localhost:9000/api/logout";

export default function Navbar(props) {
    const [awaitResp, setAwaitResp] = useState(false);
    const user = parseJWT();

    useEffect(() => {
        if(user)
            console.log("Logged in as: '" + user.username + "'.");
        else
            console.log("User is not currently logged in.")

    }, []);


    const sendRequest = useCallback(async () => {
        if(awaitResp)
            return;
        else {
            // Set to true to disable logout button (prevent spam clicking)
            setAwaitResp(true);

            // If a user is even logged in...
            if(user !== null) {
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
                if(response.status === 200) {
                    const json = await response.json();
                    console.log(json);
                }
                

                setAwaitResp(false);
            }
        }
    }, [awaitResp]);

    return (
        <div className="navbar-container">
            <div className="left">
                <div className="dropdown" onClick={() => {props.onClick()}}>
                    <span className="material-icons">reorder</span>
                </div>
                <div className="title">
                    <a href="/">Hippo.</a>
                </div>
                
            </div>
            <div className="right">
                <a href="/login" className="button">
                    <span>Login</span>
                </a>
                <a className="button" disabled={awaitResp} href="/" onClick={sendRequest}>
                    <span>Logout</span>
                </a>
            </div>
        </div>
    )
}