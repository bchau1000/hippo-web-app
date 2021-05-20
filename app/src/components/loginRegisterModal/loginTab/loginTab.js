import { useState, useEffect } from 'react';

import "./loginTab.css";

export default function LoginTab(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState("");

    useEffect(() => {
        
    }, [username, password]);

    

    return (
        <div className="login-tab-container">
            <div className="login-tab-notification">{notification}</div>
            <form className="login-tab-form-container">
                <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
                <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                <button onClick={(event) => props.handleLogin(event, username, password, setNotification)}>Log In</button>
            </form>
        </div>
    )
}
/*
<input type="text" />
                <input type="password" />
*/