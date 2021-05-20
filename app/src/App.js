import "./App.css";

import BrowsePage from "pages/BrowsePage/BrowsePage.js";
import CreateSetPage from "pages/CreateSetPage/CreateSetPage.js";
import EditSetPage from "pages/EditSetPage/EditSetPage.js";
import StudyPage from "pages/StudyPage/StudyPage.js";
import SetsPageRework from "pages/SetsPageRework/SetsPageRework.js";
import Navbar from "components/navbar/navbar.js";
import Sidebar from "components/sidebar/sidebar.js";
import Login from "pages/Login/Login.js";
import SignUp from "pages/Register/Register.js";
import WelcomePage from "pages/WelcomePage/WelcomePage.js";
import SandBox from "pages/SandBox/SandBox.js";
import useViewport from "components/getViewport/getViewport.js";
import jwt_decode from "jwt-decode";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";


export default function App(props) {
    const [user, setUser] = useState(null);
    const localSD = JSON.parse(localStorage.getItem('showDropdown'));
    const [showDropdown, setShowDropdown] = useState((localSD !== null) ? localSD : false);
    const width = useViewport();

    useEffect(() => {
        /*
            Called on every reload, confirms whether or not the user is currently signed in using
            stored refresh tokens in the backend.
        */
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
            if(response.status === 201) {
                const json = await response.json();
                setUser(jwt_decode(json.content));
            }
            else 
                console.log('User not currently logged in.')
        }
        getUser();
    }, []);

    useEffect(() => {
        if (width <= 1025)
            setShowDropdown(false);
        else
            setShowDropdown(true);
        
        
    }, [width]);

    useEffect(() => {
        if (width >= 768)
            localStorage.setItem('showDropdown', showDropdown);
    }, [showDropdown, width]);

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
                <div className={`sidebar-margin ${showDropdown ? 'sidebar-transition-true' : ""}`}/>

                <Navbar
                    onClick={() => setShowDropdown(current => !current)}
                    showDropdown={showDropdown}
                    width={width}
                    user={user}
                />
                <Switch>
                    <Route exact path="/sandbox" render={(props) => <SandBox {...props}/>} />
                    <Route exact path="/" component={WelcomePage} />
                    <Route exact path="/:username/sets" render={(props) => <SetsPageRework width={width} {...props}/>} />
                    <Route exact path="/sets/:set_id/edit" render={(props) => <EditSetPage user={user} {...props}/>} />
                    <Route exact path="/sets/new" render={(props) => <CreateSetPage user={user} {...props}/>} />
                    <Route exact path="/sets/:set_id/cards" render={(props) => <StudyPage {...props}/>} />
                    <Route exact path="/browse" render={(props) => <BrowsePage {...props}/>} />
                </Switch>
                {
                    showDropdown &&
                    <div className="focus-container" onClick={() => setShowDropdown(false)} />
                }
            </div>
        </Router>
    );
}