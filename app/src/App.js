import "./App.css";
import CreateSet from "./components/createSet/createSet.js";
import SetGrid from "./components/setGrid/setGrid.js";
import Navbar from "./components/navbar/navbar.js";
import Sidebar from "./components/sidebar/sidebar.js";
import Login from "./pages/login/login.js";
import SignUp from "./pages/signup/signup.js";
import About from "./pages/about/about.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/sets">
                    <div className="main-container">
                        <Navbar />
                        <Sidebar />
                        <SetGrid />
                    </div>
                </Route>
                <Route exact path="/sets/new">
                    <div className="main-container">
                        <Navbar />
                        <Sidebar />
                        <CreateSet />
                    </div>
                </Route>
            </Switch>

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

            <Switch>
                <Route exact path="/about">
                    <About />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
