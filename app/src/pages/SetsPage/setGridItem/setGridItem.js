import "./setGridItem.css";
import isOwner from 'components/isOwner/isOwner.js';


function redirect(set_id) {
    window.location.href = "/sets/" + set_id + "/cards";
}

async function onEdit(event, set_id) {
    event.stopPropagation(); // Stops parent onClick
    
    if(await isOwner(set_id)) 
        window.location.href = "/sets/" + set_id + "/edit";
    else 
        alert('You must be the owner of this set to edit/delete it.');
}

export default function SetGridItem(props) {
    
    
    return (
        <div className="grid-item" onClick={() => redirect(props.id)}>
            <div className="options">
                <button onClick={(event) => props.onDelete(event, props.id)}>
                    <span className="material-icons delete">delete</span>
                </button>
                <button onClick={(event) => onEdit(event, props.id)}>
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