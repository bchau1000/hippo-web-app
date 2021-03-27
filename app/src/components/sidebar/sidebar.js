import { render } from '@testing-library/react';
import React from 'react';

import './sidebar.css';
import { makeStyles } from '@material-ui/core/styles';

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";

const styles = makeStyles((props) => ({
    title: {
        flexGrow: 1,
        
    },
    paper: {
        marginTop: props => props.marginTop,
        width: props => props.width,
    },

}))

export default function Sidebar(props) {
    const classes = styles(props);

    return (
        <Drawer classes={{paper: classes.paper}} variant="permanent">
            <List>
                {['Dashboard', 'Study Sets', 'Trash'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}