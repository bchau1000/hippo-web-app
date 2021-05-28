import { useState, useEffect } from 'react';
import CardForm from './cardForm/cardForm.js';
import "./SandBox.css";

export default function SandBox(props) {

    useEffect(() => {

    }, []);

    return (
        <div className="sandbox-container">
            <CardForm/>
        </div>

    )
}