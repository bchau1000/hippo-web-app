import { useState, useEffect } from 'react';
import LoginRegisterModal from 'components/loginRegisterModal/loginRegisterModal.js';
import "./SandBox.css";

export default function SandBox(props) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

    }, []);

    return (
        <div className="sandbox-wrapper">
            <LoginRegisterModal
                showModal={showModal}
                closeModal={setShowModal}
            >

            </LoginRegisterModal>
            <button onClick={() => {setShowModal(true)}}>
                Open
            </button>
        </div>

    )
}