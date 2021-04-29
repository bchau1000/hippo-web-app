import parseJWT from "../authUser/authUser.js";
import './sidebar.css';

const loggedIn = (user) => {
    let href = "/login";

    if (user)
        href = "/" + user.username + "/sets";

    return href;
}

export default function Sidebar(props) {
    const user = parseJWT();

    return (
        <div className="sidebar-container">
            <div className="sidebar-collapse" />

            <ul className="sidebar-items-container">
                <li className="sidebar-item">
                    <a className="sidebar-link-wrapper" href="/">
                        <span className="material-icons">search</span>
                        <span htmlFor="home">Browse</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link-wrapper" href={loggedIn(user)}>
                        <span className="material-icons">layers</span>
                        <span htmlFor="sets">Sets</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link-wrapper" href="/sets/new">
                        <span className="material-icons">library_add</span>
                        <span htmlFor="create">Create</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link-wrapper" href="/settings">
                        <span className="material-icons">settings</span>
                        <span htmlFor="settings">Settings</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}