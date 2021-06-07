import './sidebar.css';
import ProfilePic from 'components/profilePic/profilePic.js';


export default function Sidebar(props) {
    return (
        <div className="sidebar-container no-select">
            <div className="sidebar-header">
                <a href="/">Hippo.</a>
            </div>

            <ul className="sidebar-items-container">
                <li className="sidebar-item">
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => { window.location.href = "/browse" }}
                    >
                        <span className="material-icons">search</span>
                        <span htmlFor="sets">Browse</span>
                    </button>
                </li>
                <li className="sidebar-item">
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => props.user === null ? props.setShowLoginModal(true) : window.location.href = "/" + props.user.username + "/sets"}
                    >
                        <span className="material-icons">layers</span>
                        <span htmlFor="sets">Sets</span>
                    </button>
                </li>
                <li className="sidebar-item">
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => props.user === null ? props.setShowLoginModal(true) : window.location.href = "/sets/new"}
                    >
                        <span className="material-icons">library_add</span>
                        <span htmlFor="sets">Create</span>
                    </button>
                </li>
                <li className="sidebar-item">
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => { window.location.href = "/sandbox" }}
                    >
                        <span className="material-icons">settings</span>
                        <span htmlFor="sets">Sandbox</span>
                    </button>
                </li>
                {props.user &&
                    <div className="sidebar-profile-item">
                        <div className="profile-pic-border">
                            <ProfilePic
                                username={props.user.username}
                                dimensions={"60px"}
                                border={true}
                            />
                        </div>
                        <span className="sidebar-profile-username">{props.user.username}</span>
                    </div>
                }

            </ul>
        </div>
    );
}