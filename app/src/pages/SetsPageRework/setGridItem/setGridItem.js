import "./setGridItem.css";
import { useContext, useState, useEffect } from 'react';
import { isOwnerSet } from 'components/isOwner/isOwner.js';
import { OwnerContext } from 'pages/SetsPageRework/SetsPageRework.js';
import { Link, useHistory } from 'react-router-dom';
import ConfirmModal from 'components/confirmModal/confirmModal.js';
import ProfilePic from 'components/profilePic/profilePic.js';

export default function SetGridItem(props) {
    const owner = useContext(OwnerContext);
    const tags = props.tags ? props.tags.split(',').slice(0, 3) : [];
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState(null);

    async function onEdit(event, set_id) {
        event.stopPropagation();

        if (await isOwnerSet(set_id)) {
            history.push("/sets/" + set_id + "/edit");
        }
    }

    useEffect(() => {
        if(confirm)
            props.onDelete( props.id);
    }, [confirm]);

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
                <button
                    title="delete"
                    onClick={(event) => {
                        event.stopPropagation();
                        setModal(true);
                    }}

                >
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
            <ConfirmModal
                state={[modal, setModal]}
                setConfirm={setConfirm}
                header={"Confirm"}
                text={"Are you sure you want to delete this set? This action cannot be undone."}
            />
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
                        return (
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