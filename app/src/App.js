import "./App.css";
import Dashboard from "./pages/dashboard/dashboard.js";
import Login from "./pages/login/login.js";
import SignUp from "./pages/signup/signup.js";
import About from "./pages/about/about.js";

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/dashboard">
          <Dashboard />
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
