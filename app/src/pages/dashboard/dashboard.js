import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../../components/navbar/navbar.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import SetGrid from '../../components/setGrid/setGrid.js';
import './dashboard.css';


const navbarHeight = 65;
const sidebarWidth = 240;

const classes = makeStyles((theme) => ({

}));

class Dashboard extends React.Component {
    render() {
        return (
            <div className="main-container">
                <Navbar height={navbarHeight}></Navbar>
                <Sidebar marginTop={navbarHeight} width={sidebarWidth}></Sidebar>
                <SetGrid></SetGrid>
            </div>
        );
    }
}

export default Dashboard;