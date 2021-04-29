import "./App.css";
import CreateSetPage from "./pages/CreateSetPage/CreateSetPage.js";
import StudyPage from "./pages/StudyPage/StudyPage.js";
import SetsPage from "./pages/SetsPage/setGrid.js";
import Navbar from "./components/navbar/navbar.js";
import Sidebar from "./components/sidebar/sidebar.js";
import Login from "./pages/Login/Login.js";
import SignUp from "./pages/Register/Register.js";
import WelcomePage from "./pages/WelcomePage/WelcomePage.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function App(props) {
    // Boolean value is stored as a string in local storage, JSON parse to get boolean value
    const localSD = JSON.parse(localStorage.getItem('showDropdown'));
    const [showDropdown, setShowDropdown] = useState((localSD !== null) ? localSD : false);

    useEffect(() => {
        localStorage.setItem('showDropdown', showDropdown);
    });

    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>

            <Switch>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
            </Switch>
            <div className="main-container">
                {
                    showDropdown && <Sidebar></Sidebar>
                }
                <Navbar onClick={() => setShowDropdown(!showDropdown)}></Navbar>
                <Switch>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>

                    <Route exact path="/:username/sets" component={SetsPage}/>
                    <Route exact path="/sets/new">
                        <CreateSetPage />
                    </Route>
                    <Route path="/sets/:id/cards" component={StudyPage} />
                </Switch>
            </div>
        </Router>
    );
}

