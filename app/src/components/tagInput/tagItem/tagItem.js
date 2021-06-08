import './tagItem.css';

export default function tagItem(props) {
    return (
        <div className="tag-item-container">
            <span>{props.tag}</span>
            <button className="no-select" onClick={() => props.removeTag(props.tag)}>
                <span className="material-icons">close</span>
            </button>
        </div>
    )
}