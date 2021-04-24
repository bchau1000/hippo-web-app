import "./App.css";
import CreateSet from "./components/createSet/createSet.js";
import StudyPage from "./pages/StudyPage/StudyPage.js";
import SetsPage from "./pages/SetsPage/setGrid.js";
import Navbar from "./components/navbar/navbar.js";
import Sidebar from "./components/sidebar/sidebar.js";
import Login from "./pages/Login/Login.js";
import SignUp from "./pages/Register/Register.js";
import WelcomePage from "./pages/WelcomePage/WelcomePage.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
        };
    }

    componentDidMount() {
        const showDropdown = JSON.parse(localStorage.getItem('showDropdown'));

        if (showDropdown !== null)
            this.setState({
                showDropdown: showDropdown
            });
    }

    handleDropdown = () => {
        this.setState({
            showDropdown: !this.state.showDropdown,
        });
        localStorage.setItem('showDropdown', !this.state.showDropdown);
    }

    render() {
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
                        this.state.showDropdown && <Sidebar></Sidebar>
                    }
                    <Navbar onClick={this.handleDropdown}></Navbar>
                    <Switch>
                        <Route exact path="/">
                            <WelcomePage />
                        </Route>

                        <Route exact path="/sets">
                            <SetsPage />
                        </Route>
                        <Route exact path="/sets/new">
                            <CreateSet />
                        </Route>
                        <Route path="/sets/:id/cards" component={StudyPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
