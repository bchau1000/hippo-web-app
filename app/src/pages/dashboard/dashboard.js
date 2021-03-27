import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../../components/navbar/navbar.js';

import './dashboard.css';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="main-container">
                <Navbar className="header-container"></Navbar>
                <div className="filter-container"></div>
                <div className="sidebar-container"></div>
                <div className="content-container"></div>
            </div>
        );
    }
}

export default Dashboard;