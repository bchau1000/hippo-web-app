import "./App.css";

import CreateSetPage from "pages/CreateSetPage/CreateSetPage.js";
import StudyPage from "pages/StudyPage/StudyPage.js";
import SetsPage from "pages/SetsPage/setGrid.js";
import Navbar from "components/navbar/navbar.js";
import Sidebar from "components/sidebar/sidebar.js";
import Login from "pages/Login/Login.js";
import SignUp from "pages/Register/Register.js";
import WelcomePage from "pages/WelcomePage/WelcomePage.js";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useViewport from "components/getViewport/getViewport.js";

export default function App(props) {
    // Boolean value is stored as a string in local storage, JSON parse to get boolean value
    const localSD = JSON.parse(localStorage.getItem('showDropdown'));
    const [showDropdown, setShowDropdown] = useState((localSD !== null) ? localSD : false);
    const {_, width} = useViewport();


    useEffect(() => {
        if(width < 768)
            setShowDropdown(false);
        else
            localStorage.setItem('showDropdown', showDropdown);
    }, [width]);
    
    const onFocus = () => {
        setShowDropdown(false);
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
            </Switch>

            <div className="main-container">
                <div className = {`sidebar-transition ${showDropdown ? 'sidebar-transition-true': ""}`} >
                    <Sidebar onFocus={onFocus} showDropdown={showDropdown}/>
                </div>

                <Navbar onClick={() => setShowDropdown(!showDropdown)} showDropdown={showDropdown}></Navbar>
                <Switch>
                    <Route exact path="/" component={WelcomePage}/>
                    <Route exact path="/:username/sets" component={SetsPage}/>
                    <Route exact path="/sets/new" component={CreateSetPage}/>
                    <Route exact path="/sets/:id/cards" component={StudyPage} />
                </Switch>
                {
                    showDropdown &&
                    <div className="focus-container" onClick={() => onFocus()}/>
                }
            </div>
        </Router>
    );
}

