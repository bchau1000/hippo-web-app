import React from 'react';

import Navbar from '../../components/navbar/navbar.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import SetGrid from '../../components/setGrid/setGrid.js';
import './dashboard.css';

function onClick(text) {
    console.log("Hello!")
}

class Dashboard extends React.Component {
    render() {
        return (
            <div className="main-container">
                <Navbar></Navbar>
                <Sidebar onClick={onClick}></Sidebar>
                <SetGrid className="hide"></SetGrid>
            </div>
        );
    }
}

export default Dashboard;