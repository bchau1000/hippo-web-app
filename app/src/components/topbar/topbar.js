import React from 'react';

import './topbar.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
} from "@material-ui/core";

const styles = makeStyles((props) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        background: 'rgb(106, 6, 143)',
        height: props => props.height
    }
}))

export default function Topbar(props){
    const classes = styles(props);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>About Us</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );

}