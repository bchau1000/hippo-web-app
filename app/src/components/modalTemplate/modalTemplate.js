import './modalTemplate.css';

export default function ModalTemplate(props) {
    const showModal = props.showModal;

    return (
        <div className={`form-modal-container ${showModal ? "":"form-modal-close"}`} onClick={() => props.closeModal()}>
            <div className="form-modal-content" onClick={(event) => event.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}   