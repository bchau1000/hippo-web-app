import './confirmModal.css';

export default function ConfirmModal(props) {
    const [showModal, closeModal] = props.state;
    const setConfirm = props.setConfirm;

    return (
        <div
            className={`confirm-modal-container ${showModal ? "" : "confirm-modal-close"}`}
            onClick={() => {
                setConfirm(false);
                closeModal();
            }}
        >
            <div className="confirm-modal-content" onClick={(event) => event.stopPropagation()}>
                <div className="cm-header-container">
                    <span style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>{props.header}</span>
                    <button 
                        onClick={(event) => {
                            event.stopPropagation();
                            setConfirm(false);
                            closeModal();
                        }}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            padding: '5px',
                        }}
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="cm-text-container">
                    <span style={{
                        fontSize: '16px',
                        textAlign: 'center',
                    }}>{props.text}</span>
                </div>
                <div className="cm-buttons-container">
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            setConfirm(true);
                            closeModal();
                        }}
                        style={{
                            backgroundColor:'var(--color-accent)'
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={(event) => {
                            event.stopPropagation();
                            setConfirm(false);
                            closeModal();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}