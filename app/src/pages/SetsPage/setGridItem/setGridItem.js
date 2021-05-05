import "./setGridItem.css";


function redirect(set_id) {
    window.location.href = "/sets/" + set_id + "/cards";
}

export default function SetGridItem(props) {
    async function handleEdit(event, set_id) {
        event.stopPropagation(); // Stops parent onClick
    }
    
    return (
        <div className="grid-item" onClick={() => redirect(props.id)}>
            <div className="options">
                <button onClick={(event) => props.onDelete(event, props.id)}>
                    <span className="material-icons delete">delete</span>
                </button>
                <button onClick={(event) => handleEdit(event, props.id)}>
                    <span className="material-icons edit">edit</span>
                </button>
            </div>
            <div className="title">
                {props.title}
            </div>
            <div className="tags-container">
                <div className="tag">Math</div>
                <div className="tag">Science</div>
                <div className="tag">English</div>
            </div>
            <div className="desc">
                {props.desc}
            </div>
        </div>
    )
}