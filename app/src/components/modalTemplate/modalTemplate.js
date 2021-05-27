import './modalTemplate.css';

export default function ModalTemplate(props) {
    return (
        <div 
            className={`form-modal-container ${props.showModal ? "":"form-modal-close"}`} 
            onMouseUp={() => {
                if(props.closeOffFocus) 
                    props.closeModal();
            }}
        >
            <div 
                className="form-modal-content" 
                    onMouseUp={(event) => event.stopPropagation()} 
                    onClick={(event) => event.stopPropagation()}
            >
                {props.children}
            </div>
        </div>
    )
}