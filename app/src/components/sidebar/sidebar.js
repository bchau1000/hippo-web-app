import { useCallback, useState, useEffect } from 'react';
import './sidebar.css';
import ProfilePic from 'components/profilePic/profilePic.js';


export default function Sidebar(props) {
    const [awaitResp, setAwaitResp] = useState(false);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    
    useEffect(() => {
        setCurrentPage(window.location.pathname);
    }, []);

    const sendRequest = useCallback(async () => {
        if (awaitResp)
            return;
        else {
            // Set to true to disable logout button (prevent spam clicking)
            setAwaitResp(true);

            // If a user is even logged in...
            if (props.user !== null) {
                // Wipe user from local storage
                localStorage.setItem('user', null);

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
                    const json = await response.json();
                    window.location.href = "/browse";
                }

                setAwaitResp(false);
            }
        }
    }, [awaitResp, props.user]);

    const isCurrentPage = (path) => {
        return currentPage.includes(path);
    }

    return (
        <div className="sidebar-container no-select">
            <div className="sidebar-header">
                <a href="/">Hippo.</a>
            </div>

            <ul className="sidebar-items-container">
                {props.user
                ?   <div className="sidebar-profile-item">
                        <div className="profile-pic-border">
                            <ProfilePic
                                username={props.user.username}
                                dimensions={"60px"}
                                border={true}
                            />
                        </div>
                        
                        <span className="sidebar-profile-username">Hello, {props.user.username}</span>
                        <button  onClick={() => sendRequest()}>Logout</button>
                    </div>
                :   <div className="sidebar-profile-item">
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
                }
                <li className={`sidebar-item ? ${isCurrentPage("/browse") ? "current-page" : ""}`}>
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => { window.location.href = "/browse" }}
                    >
                        <span className="material-icons">search</span>
                        <span htmlFor="sets">Browse</span>
                    </button>
                </li>
                <li className={`sidebar-item ? ${props.user && isCurrentPage("/" + props.user.username + "/sets") ? "current-page" : ""}`}>
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => props.user === null ? props.setShowLoginModal(true) : window.location.href = "/" + props.user.username + "/sets"}
                    >
                        <span className="material-icons">layers</span>
                        <span htmlFor="sets">Sets</span>
                    </button>
                </li>
                <li className={`sidebar-item ? ${isCurrentPage("/new") ? "current-page" : ""}`}>
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => props.user === null ? props.setShowLoginModal(true) : window.location.href = "/sets/new"}
                    >
                        <span className="material-icons">library_add</span>
                        <span htmlFor="sets">Create</span>
                    </button>
                </li>
                <li className={`sidebar-item ? ${isCurrentPage("/sandbox") ? "current-page" : ""}`}>
                    <button
                        className="sidebar-link-wrapper"
                        onClick={() => { window.location.href = "/sandbox" }}
                    >
                        <span className="material-icons">settings</span>
                        <span htmlFor="sets">Sandbox</span>
                    </button>
                </li>

            </ul>
        </div>
    );
}