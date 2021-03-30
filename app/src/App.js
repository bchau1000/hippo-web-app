import "./App.css";
import Dashboard from "./pages/dashboard/dashboard.js";
import Login from "./pages/login/login.js";
import SignUp from "./pages/signup/signup.js";
import About from "./pages/about/about.js";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>

      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>

      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
