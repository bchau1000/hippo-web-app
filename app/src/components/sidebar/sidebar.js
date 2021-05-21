import './sidebar.css';

export default function Sidebar(props) {
    return (
        <div className="sidebar-container no-select">
            <div className="sidebar-collapse" />

            <ul className="sidebar-items-container">
                <li className="sidebar-item">
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => {window.location.href="/browse"}}
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
                        onClick={() => {window.location.href="/sandbox"}}
                    >
                        <span className="material-icons">settings</span>
                        <span htmlFor="sets">Sandbox</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}