import './App.css';
import Dashboard from './pages/dashboard/dashboard.js';
import Login from './pages/login/login.jsx';
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
      </Switch>
    </Router>
  );
}

export default App;
