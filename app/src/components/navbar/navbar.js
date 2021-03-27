import React from 'react';
import ReactDOM from 'react-dom';

import './navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import {

    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from "@material-ui/core";

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        
    },
    bar: {
        background: 'rgb(33, 33, 33)',
    }
}))

export default function Navbar(){
    const classes = styles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.bar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>Study Buddy</Typography>
                    <Button className="title" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
            
    );

}