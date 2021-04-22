import "./App.css";
import CreateSet from "./components/createSet/createSet.js";
import StudyView from "./pages/StudyView/StudyView.js";
import SetGrid from "./components/sets/setGrid.js";
import Navbar from "./components/navbar/navbar.js";
import Sidebar from "./components/sidebar/sidebar.js";
import Login from "./pages/Login/Login.js";
import SignUp from "./pages/Register/Register.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: true,
        };
    }

    handleDropdown = () => {
        let showDropdown = this.state.showDropdown;
        this.setState({
            showDropdown: !showDropdown,
        });
    }

    render() {
        return (
            <Router>
                <div className="main-container">
                    {
                        this.state.showDropdown && <Sidebar></Sidebar>
                    }
                    
                    <Navbar showDropdown={this.state.showDropdown} onClick={this.handleDropdown}></Navbar>
                    <Switch>
                        <Route exact path="/sets">
                            <SetGrid />
                        </Route>
                        <Route exact path="/sets/new">
                            <CreateSet />
                        </Route>
                        <Route path="/sets/:id/cards" component={StudyView} />

                    </Switch>
                </div>
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

            </Router>
        );
    }
}

export default App;
