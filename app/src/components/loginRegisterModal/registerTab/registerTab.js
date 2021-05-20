import { useState, useEffect } from 'react';

import "./registerTab.css";

export default function RegisterTab(props) {
    const [notification, setNotification] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password.length < 8) {
            setNotification("Password should be at least 8 characters.");
        }
        else if(password.normalize() !== confirmPassword.normalize()) {
            setNotification("Passwords are not matching.");
        }
        else {
            await props.handleRegister(username, password, setNotification);
        }
    }

    return (
        <div className="register-tab-container">
            <div className="register-tab-notification">{notification}</div>
            <form method="post" id="register-form" className="register-tab-form">
                <input type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}/>
                <input type="password" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
                <input type="password" placeholder="Confirm Password" onChange={(event) => {setConfirmPassword(event.target.value)}}/>
                <div className="register-tab-button-container">
                    <button onClick={(event) => handleSubmit(event)}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}