import { useCallback, useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from 'context/context.js';
import ProfilePic from 'components/profilePic/profilePic.js';

import './sidebar.css';

export default function Sidebar(props) {
    const [awaitResp, setAwaitResp] = useState(false);
    const currentPage = useLocation();
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext);

    useEffect(() => {
        setLoading(false);
    }, []);

    const sendRequest = useCallback(async () => {
        if (awaitResp)
            return;
        else {
            // Set to true to disable logout button (prevent spam clicking)
            setAwaitResp(true);

            // If a user is even logged in...
            if (user !== null) {

                // Send logout request...
                const body = JSON.stringify({
                });
                const settings = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body,
                };
                const response = await fetch('/api/logout', settings);
                if (response.status === 201) {
                    //const json = await response.json();
                    localStorage.setItem('user', null);
                    window.location.href = "/browse";
                }

                setAwaitResp(false);
            }
        }
    }, [awaitResp, user]);

    const isCurrentPage = (path) => {
        return currentPage.pathname.includes(path);
    }

    const setProfile = () => {
        if (user) {
            return (
                <div className="sidebar-profile-item">
                    <div className="profile-pic-border">
                        <ProfilePic
                            username={user.username}
                            dimensions={"60px"}
                            border={true}
                        />
                    </div>

                    <span className="sidebar-profile-username">Hello, {user.username}</span>
                    <button onClick={() => sendRequest()}>Logout</button>
                </div>
            )
        }
        else {
            return (
                <div className="sidebar-profile-item">
                    <div className="profile-pic-border">
                        <ProfilePic
                            username={"?guest"}
                            dimensions={"60px"}
                            border={true}
                        />
                    </div>
                    <span className="sidebar-profile-username">Hello, Guest</span>
                    <button onClick={() => props.setShowLoginModal(true)}>Login/Register</button>
                </div>
            )
        }
    }

    return (
        <div className="sidebar-container no-select">
            <div className="sidebar-header">
                <Link to="/">Hippo.</Link>
            </div>

            <ul className="sidebar-items-container">
                {
                    setProfile()
                }
                <li className={`sidebar-item ? ${isCurrentPage("/browse") ? "current-page" : ""}`}>
                    <Link
                        className="sidebar-link-wrapper"
                        to="/browse"
                    >
                        <span className="material-icons">search</span>
                        <span htmlFor="sets">Browse</span>
                    </Link>
                </li>
                <li className={`sidebar-item ? ${user && isCurrentPage("/" + user.username + "/sets") ? "current-page" : ""}`}>
                    <Link
                        className="sidebar-link-wrapper"
                        onClick={() => user === null ? props.setShowLoginModal(true) : ""}
                        to={user === null ? currentPage : "/" + user.username + "/sets"}
                    >
                        <span className="material-icons">layers</span>
                        <span htmlFor="sets">Sets</span>
                    </Link>
                </li>
                <li className={`sidebar-item ? ${isCurrentPage("/new") ? "current-page" : ""}`}>
                    <Link
                        className="sidebar-link-wrapper"
                        onClick={() => user === null ? props.setShowLoginModal(true) : ""}
                        to={user === null ? currentPage : "/sets/new"}
                    >
                        <span className="material-icons">library_add</span>
                        <span htmlFor="sets">Create</span>
                    </Link>
                </li>
                <li className={`sidebar-item ? ${isCurrentPage("/sandbox") ? "current-page" : ""}`}>
                    <Link
                        className="sidebar-link-wrapper"
                        to="/sandbox"
                    >
                        <span className="material-icons">settings</span>
                        <span htmlFor="sets">Sandbox</span>
                    </Link>
                </li>

            </ul>
        </div>
    );
}