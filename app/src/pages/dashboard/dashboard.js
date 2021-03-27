import React from 'react';
import Navbar from '../../components/navbar/navbar.js';
import Sidebar from '../../components/sidebar/sidebar.js';

import { makeStyles, rgbToHex } from '@material-ui/core/styles';

import './dashboard.css';

const navbarHeight = 65;
const sidebarWidth = 240;

const classes = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        backgroundColor: 'rgb(24, 24, 24)',
    }
}));

class Dashboard extends React.Component {
    
    render() {
        return (
            <div className={classes.root}>
                <Navbar height={navbarHeight}></Navbar>
                <Sidebar marginTop={navbarHeight} width={sidebarWidth}></Sidebar>
                <main className={classes.content}>
                </main>
            </div>
        );
    }
}

export default Dashboard;