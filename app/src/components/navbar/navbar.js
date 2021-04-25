import React, { useState, useEffect, useCallback, useRef } from 'react';
import "./navbar.css";

const API_URL = "http://localhost:9000/api/logout";

export default function Navbar(props) {
    const isMounted = useRef(true);
    const [awaitResp, setAwaitResp] = useState(false);

    useEffect(() => {
        isMounted.current = false;
    }, []);

    const sendRequest = useCallback(async () => {
        if(awaitResp)
            return;
        else {
            
            setAwaitResp(true);
            const user = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', null);

            if(user !== null) {
                alert('hello');
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
                const response = await (await fetch(API_URL, settings)).json();
                
                if(isMounted.current)
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
                    <a href="/">Hippo</a>
                </div>
                
            </div>
            <div className="right">
                <a href="/login" className="button">
                    <span>Login</span>
                </a>
                <a className="button" disabled={awaitResp} href="/" onClick={sendRequest}>
                    <span>Logout(Test)</span>
                </a>
            </div>
        </div>
    )
}