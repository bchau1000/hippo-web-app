import { useState, useContext } from 'react';
import { NotificationContext } from 'context/context.js';
import { v4 as uuidv4 } from 'uuid';
import ModalTemplate from 'components/modalTemplate/modalTemplate.js';
import LoginTab from './loginTab/loginTab.js';
import RegisterTab from './registerTab/registerTab.js';

import "./loginRegisterModal.css";

export default function LoginRegisterModal(props) {
    const [tab, setTab] = useState(true);
    const dispatchNotifications = useContext(NotificationContext);

    const handleLogin = async (event, username, password, setNotification, setLoading) => {
        event.preventDefault();
        const body = JSON.stringify({
            "username": username,
            "password": password
        });

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        }

        const response = await fetch("/api/login", settings);
        if (response.status === 200) {
            const json = await response.json();
            window.location.href = "/" + json.content.username + "/sets";
        }
        else {
            setNotification("Invalid username or password.");
            setLoading(false);
        }
    }

    const handleRegister = async (username, password, setNotification) => {
        const body = JSON.stringify({
            "username": username,
            "email": "temp@email.com",
            "password": password,
            "firstName": "firstName",
            "lastName": "lastName",
        });

        const settings = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        }

        const response = await fetch("/api/register", settings);
        if (response.status === 201) {
            setTab(true);
            setNotification("");
            dispatchNotifications({
                type: 'ADD',
                value: {
                    id: uuidv4(),
                    text: 'Registered successfully!',
                    status: 'Success'
                },
            });
        }
        else if (response.status === 401) {
            setNotification("Username is already taken.");
        }
    }

    const setContent = () => {

        if (tab)
            return (<LoginTab handleLogin={handleLogin} />);

        else
            return (<RegisterTab handleRegister={handleRegister} />);

    }

    return (
        <ModalTemplate
            showModal={props.showModal}
            closeModal={() => { props.closeModal(false) }}
        >
            <div className="lr-modal-container">
                <div className="lr-modal-close">
                    <button onClick={() => props.closeModal(false)}>
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="lr-modal-tabs">
                    <button
                        className={`${tab ? "lr-tab-selected" : ""}`}
                        onClick={() => { setTab(true) }}
                        style={{ 'borderTopLeftRadius': '2px' }}
                    >
                        <span className="material-icons">
                            login
                        </span>
                        <span>Login</span>
                    </button>
                    <button
                        className={`${tab ? "" : "lr-tab-selected"}`}
                        onClick={() => { setTab(false) }}
                        style={{ 'borderTopRightRadius': '2px' }}
                    >
                        <span className="material-icons">
                            create
                        </span>
                        <span>Register</span>
                    </button>
                </div>
                {
                    setContent()
                }
            </div>
        </ModalTemplate>
    )
}