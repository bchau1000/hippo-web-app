import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard/dashboard.js';
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
          <Dashboard></Dashboard>
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
