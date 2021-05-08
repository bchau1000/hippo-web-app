import { useState, useEffect } from 'react';
import ModalTemplate from  'components/modalTemplate/modalTemplate.js';
import "./SandBox.css";

export default function SandBox(props) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    }, []);

    function closeModal() {
        setShowModal(false);
    }

    return (
        <div className="sandbox-wrapper">
            <button className="sb-modal-button" onClick={() => setShowModal(true)}></button>
            <section className="sandbox-container">
            </section>
        </div>

    )
}