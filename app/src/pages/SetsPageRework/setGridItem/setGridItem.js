import "./setGridItem.css";
import { useContext } from 'react';
import { isOwnerSet } from 'components/isOwner/isOwner.js';
import { OwnerContext } from 'pages/SetsPageRework/SetsPageRework.js';
import { Link, useHistory } from 'react-router-dom';
import ProfilePic from 'components/profilePic/profilePic.js';



export default function SetGridItem(props) {
    const owner = useContext(OwnerContext);
    const tags = props.tags ? props.tags.split(',').slice(0, 3) : [];
    const history = useHistory();

    async function onEdit(event, set_id) {
        event.stopPropagation(); // Stops parent onClick
    
        if (await isOwnerSet(set_id)) {
            history.push("/sets/" + set_id + "/edit");
        }
        else
            alert('You must be the owner of this set to edit/delete it.');
    }

    function setOptions() {
        if (props.isFolder) {
            return (
                <div className="options">
                    <button title="edit" onClick={(event) => props.onRemove(event, props.id)}>
                        <span className="material-icons edit">close</span>
                    </button>
                </div>
            )
        }
        return (
            <div className="options">
                <button title="delete" onClick={(event) => props.onDelete(event, props.id)}>
                    <span className="material-icons delete">delete</span>
                </button>
                <button title="edit" onClick={(event) => onEdit(event, props.id)}>
                    <span className="material-icons edit">edit</span>
                </button>
            </div>
        )
    }

    return (
        <div className="grid-item" onClick={() => history.push("/sets/" + props.id + "/cards")}>
            <div className="info-options">
                <Link to={"/"} className="info">
                    <ProfilePic dimensions={'25px'} username={"admin"} fontSize={'16px'} />
                    <span style={{ fontWeight: '500', color: 'rgb(24, 24, 24)' }}>{props.username}</span>
                </Link>

                {owner &&
                    setOptions()
                }

            </div>
            <div className="title">
                {props.title}
            </div>
            <div className="tags-container">
            {
                tags.map((tag, idx) => {
                    return(
                        <span 
                            key={idx}
                            className="tag"
                        > 
                            {tag}
                        </span>
                    )
                })
            }
            </div>
        </div>
    )
}