import { useState, useEffect } from 'react';

import "./registerTab.css";

export default function RegisterTab(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

    }, []);

    useEffect(() => {

    }, [username, password, confirmPassword]);

    return (
        <div className="register-tab-container">

        </div>
    )
}