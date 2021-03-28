import React from 'react';

import "./setGrid.css";
import SetGridItem from "./setGridItem/setGridItem.js";

class SetGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grid-container">
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
                <SetGridItem/>
            </div>
            
        )
    }
}

export default SetGrid;