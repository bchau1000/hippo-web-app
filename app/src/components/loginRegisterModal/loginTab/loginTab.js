import { useState, useEffect } from 'react';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';

import "./loginTab.css";

export default function LoginTab(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    }, []);


    return (
        <div className="login-tab-container">
            <div className="login-tab-notification">{notification}</div>
            <form className="login-tab-form-container">
                <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                <div className="login-tab-button-container">
                {!loading ?
                    <button
                        onClick={async (event) => {
                            setLoading(true);
                            await props.handleLogin(event, username, password, setNotification)
                            setLoading(false);
                            setUsername("");
                            setPassword("");
                        }}
                    >Log In</button> :
                    <LoadingAnim text="Logging in..."/>
                }
                </div>
                

            </form>
        </div>
    )
}
/*
<input type="text" />
                <input type="password" />
*/