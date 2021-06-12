import { Link } from 'react-router-dom';
import ProfilePic from "components/profilePic/profilePic.js";
import "./browseItem.css";

export default function BrowseItem(props) {
    const set = props.set;
    const tags = set.tags ? set.tags.split(',') : null;
    return (
        <li className="browse-item-container" onClick={() => { window.location.href = "/sets/" + set.id + "/cards"; }}>
            <div className="browse-item-header">
                <Link className="profile-container" to={ set.username + "/sets/"} onClick={(event) => event.stopPropagation()}>
                    <ProfilePic
                        dimensions={'25px'}
                        username={set.username}
                        fontSize={'16px'}
                    />
                    <span className="profile-username">{set.username}</span>
                </Link>
                <button onClick={(event) => {event.stopPropagation();}}>
                    <span className="material-icons">star</span>
                </button>
            </div>
            <div className="browse-item-content">
                <span className="title">{set.title}</span>
                <span className="description">{set.description}</span>
            </div>
            <div className="browse-item-footer">
                {tags &&
                    tags.map((tag, idx) => {
                        return(
                            <button 
                                key={"tag" + idx} 
                                className="tag-container"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    window.location.href = "/browse?tags=" + tag;
                                }}
                            >
                                <span>#{tag}</span>
                            </button>
                        )
                    })
                }
            </div>
        </li>
    )
}