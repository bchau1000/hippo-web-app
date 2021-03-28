import './App.css';
import Dashboard from './pages/dashboard/dashboard.js';
import Login from './pages/login/login.js';
import SignUp from './pages/signup/signup.js';
import About from './pages/about/about.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Router path="/dashboard">
          <Dashboard/>
        </Router>
        <Router path="/login">
          <Login />
        </Router>
        <Router path="/signup">
          <SignUp />
        </Router>
        <Router path="/about">
          <About />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
