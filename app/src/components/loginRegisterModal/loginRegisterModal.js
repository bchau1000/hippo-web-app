import { useState, useEffect } from 'react';
import ModalTemplate from 'components/modalTemplate/modalTemplate.js';
import LoginTab from './loginTab/loginTab.js';
import RegisterTab from './registerTab/registerTab.js';
import LoadingAnim from 'components/loadingAnim/loadingAnim.js';

import "./loginRegisterModal.css";

export default function LoginRegisterModal(props) {

    const [tab, setTab] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, []);

    const handleLogin = async (event, username, password, setNotification) => {
        event.preventDefault();

        setLoading(true);
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

        const response = await fetch("api/login", settings);
        if(response.status === 200) {
            const json = await response.json();
            window.location.href = "/" + json.content.username + "/sets";
        }
        else
            setNotification("Invalid username or password.");
        setLoading(false);
    }

    const setContent = () => {
        if(loading) {
            return(
                <div className="lr-loading-container">
                    <LoadingAnim />
                </div>
                
            )
        }
        else {
            if(tab) {
                return(
                    <LoginTab
                        handleLogin={handleLogin}
                    />
                )
            }
            else {
                <RegisterTab
                />
            }
        }
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
                    <button className={`${tab ? "lr-tab-selected" : ""}`} onClick={() => { setTab(true) }}>
                        <span className="material-icons">
                            login
                        </span>
                        <span>Login</span>
                    </button>
                    <button className={`${tab ? "" : "lr-tab-selected"}`} onClick={() => { setTab(false) }}>
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