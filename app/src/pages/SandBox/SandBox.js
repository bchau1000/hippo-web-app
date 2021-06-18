import { useEffect, useState } from 'react';
import ConfirmModal from 'components/confirmModal/confirmModal.js';
import "./SandBox.css";

export default function SandBox(props) {
    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState(null);

    useEffect(() => {
        console.log(confirm);
    }, [confirm]);

    return (
        <div className="sandbox-container">
            
        </div>
    )
}