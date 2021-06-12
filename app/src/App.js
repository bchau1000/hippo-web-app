import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { UserContext } from 'context/context.js';
import useViewport from "components/useViewport/useViewport.js";
import LoginRegisterModal from 'components/loginRegisterModal/loginRegisterModal.js';
import BrowsePage from "pages/BrowsePage/BrowsePage.js";
import CreateSetPage from "pages/CreateSetPage/CreateSetPage.js";
import EditSetPage from "pages/EditSetPage/EditSetPage.js";
import StudyPage from "pages/StudyPageRework/StudyPage.js";
import SetsPageRework from "pages/SetsPageRework/SetsPageRework.js";
import Navbar from "components/navbar/navbar.js";
import Sidebar from "components/sidebar/sidebar.js";
import WelcomePage from "pages/WelcomePage/WelcomePage.js";
import SandBox from "pages/SandBox/SandBox.js";

import "./App.css";



export function App(props) {
    const [user, setUser] = useState(null);
    const localSD = JSON.parse(localStorage.getItem('showDropdown'));
    const [showDropdown, setShowDropdown] = useState((localSD !== null) ? localSD : false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const width = useViewport();

    useEffect(() => {
        async function getUser() {
            const body = JSON.stringify({
            });

            const settings = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: body,
            };

            const response = await fetch('/api/auth', settings);

            if (response.status === 201) {
                const json = await response.json();
                
                localStorage.setItem('user', jwt_decode(json.content));
                setUser(jwt_decode(json.content));
            }
            else {
                console.log('User not currently logged in.')
            }

        }
        getUser();
    }, []);

    useEffect(() => {
        width <= 1025 ? setShowDropdown(false) : setShowDropdown(localSD);
        
    }, [width]);

    useEffect(() => {
        if (width >= 768)
            localStorage.setItem('showDropdown', showDropdown);
    }, [showDropdown, width]);

    return (
        <Router>
            <div className="main-container">
                <LoginRegisterModal
                    showModal={showLoginModal}
                    closeModal={setShowLoginModal}
                />
                <div className={`sidebar-transition ${showDropdown ? 'sidebar-transition-true' : ""}`} >
                    <Sidebar
                        onFocus={() => setShowDropdown(false)}
                        showDropdown={showDropdown}
                        setShowLoginModal={setShowLoginModal}
                        user={user}
                    />
                </div>
                <div className={`sidebar-margin ${showDropdown ? 'sidebar-transition-true' : ""}`} />

                <Navbar
                    onClick={() => setShowDropdown(current => !current)}
                    showDropdown={showDropdown}
                    setShowLoginModal={setShowLoginModal}
                    width={width}
                    user={user}
                />
                <Switch>
                    <Route exact path="/sandbox" render={(props) => <SandBox {...props} />} />
                    <Route exact path="/" render={(props) => <WelcomePage setShowLoginModal={setShowLoginModal} user={user} {...props} />} />
                    <Route exact path="/:username/sets" render={(props) => <SetsPageRework width={width} {...props} />} />
                    <Route exact path="/sets/:set_id/edit" render={(props) => <EditSetPage user={user} {...props} />} />
                    <Route exact path="/sets/new" render={(props) => <CreateSetPage user={user} {...props} />} />
                    <Route exact path="/sets/:set_id/cards" render={(props) => <StudyPage {...props} />} />
                    <Route exact path="/browse" render={(props) => <BrowsePage {...props} />} />
                </Switch>
                {
                    showDropdown &&
                    <div className="focus-container" onClick={() => setShowDropdown(false)} />
                }
            </div>
        </Router>
    );
}