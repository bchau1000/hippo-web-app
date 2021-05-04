import "./App.css";

import CreateSetPage from "pages/CreateSetPage/CreateSetPage.js";
import StudyPage from "pages/StudyPage/StudyPage.js";
import SetsPage from "pages/SetsPage/setGrid.js";
import Navbar from "components/navbar/navbar.js";
import Sidebar from "components/sidebar/sidebar.js";
import Login from "pages/Login/Login.js";
import SignUp from "pages/Register/Register.js";
import WelcomePage from "pages/WelcomePage/WelcomePage.js";
import jwt_decode from "jwt-decode";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import useViewport from "components/getViewport/getViewport.js";

export default function App(props) {
    const [user, setUser] = useState(null);
    const [awaitResp, setAwaitResp] = useState(false);
    const localSD = JSON.parse(localStorage.getItem('showDropdown'));
    const [showDropdown, setShowDropdown] = useState((localSD !== null) ? localSD : false);
    const width = useViewport();

    useEffect(() => {
        /*
            Called on every reload, confirms whether or not the user is currently signed in using
            stored refresh tokens in the backend.
        */
        async function getUser() {
            if(awaitResp)
                return;

            setAwaitResp(true);
            const body = JSON.stringify({

            });

            const settings = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: body,
            };

            const response = await fetch('/api/auth', settings);
            if(response.status === 201) {
                const json = await response.json();
                setUser(jwt_decode(json.content));
            }
            else 
                console.log('User not currently logged in.')
            setAwaitResp(false);
        }
        getUser();
    }, []);

    useEffect(() => {
        if (width < 768)
            setShowDropdown(false);
    }, [width]);

    useEffect(() => {
        if (width >= 768)
            localStorage.setItem('showDropdown', showDropdown);
    }, [showDropdown]);

    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>

            <div className="main-container">
                <div className={`sidebar-transition ${showDropdown ? 'sidebar-transition-true' : ""}`} >
                    <Sidebar
                        onFocus={() => setShowDropdown(false)}
                        showDropdown={showDropdown}
                        user={user}
                    />
                </div>

                <Navbar
                    onClick={() => setShowDropdown(current => !current)}
                    showDropdown={showDropdown}
                    user={user}
                />
                <Switch>
                    <Route exact path="/" component={WelcomePage}/>
                    <Route exact path="/:username/sets" render={(props) => <SetsPage {...props}/>}/>
                    <Route exact path="/sets/new" render={(props) => <CreateSetPage user={user} {...props}/>}/>
                    <Route exact path="/sets/:id/cards" render={(props) => <StudyPage {...props}/>}/>
                </Switch>
                {
                    showDropdown &&
                    <div className="focus-container" onClick={() => setShowDropdown(false)} />
                }
            </div>
        </Router>
    );
}