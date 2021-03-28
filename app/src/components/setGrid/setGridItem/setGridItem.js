import React from 'react';
import Grid from '@material-ui/core/Grid';

import "./setGridItem.css";

export default function SetGridItem(props) {
    return (
        <div className="grid-item" onClick = {props.onClick}>
            <div className="title">
                CS132: Study Guide
            </div>
            <div className="tags-container">
                <div className="tag">Math</div>
                <div className="tag">Science</div>
                <div className="tag">English</div>
            </div>
            <div className="desc">
                Some text here about the details of this set of index cards. Just testing to see
                how many characters we can fit on this one card. Hopefully it's about this
                much. Maybe this much. Or this much.
            </div>
        </div>
    )
}