import './sidebar.css';

export default function Sidebar(props) {
    return (
        <div className="sidebar-container no-select">
            <div className="sidebar-collapse" />

            <ul className="sidebar-items-container">
                <li className="sidebar-item">
                    <a className="sidebar-link-wrapper" href="/browse">
                        <span className="material-icons">search</span>
                        <span htmlFor="home">Browse</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a
                        className="sidebar-link-wrapper"
                        href={props.user === null ? "/login" : "/" + props.user.username + "/sets"}
                    >
                        <span className="material-icons">layers</span>
                        <span htmlFor="sets">Sets</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a
                        className="sidebar-link-wrapper"
                        href={props.user === null ? "/login" : "/sets/new"}
                    >
                        <span className="material-icons">library_add</span>
                        <span htmlFor="create">Create</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link-wrapper" href="/sandbox">
                        <span className="material-icons">settings</span>
                        <span htmlFor="settings">Sandbox</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}