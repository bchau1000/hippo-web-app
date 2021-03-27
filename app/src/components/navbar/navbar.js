import React from 'react';

import './navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from "@material-ui/core";

const styles = makeStyles((props) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        background: 'rgb(33, 33, 33)',
        height: props => props.height
    }
}))

export default function Navbar(props){
    const classes = styles(props);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>Study Buddy</Typography>
                    <Button className="dashboard" color="inherit" href="/dashboard">Dashboard</Button>
                    <Button className="title" color="inherit" href="/login">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );

}