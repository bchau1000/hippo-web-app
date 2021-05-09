import './modalTemplate.css';

export default function ModalTemplate(props) {

    return (
        <div className={`form-modal-container ${props.showModal ? "":"form-modal-close"}`} onClick={() => props.closeModal()}>
            <div className="form-modal-content" onClick={(event) => event.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}   