import React from 'react';

import "./setGrid.css";
import SetGridItem from "./setGridItem/setGridItem.js";

class SetGrid extends React.Component {
    constructor(props) {
        super(props);
        this.studySetList = this.props.studySetList;
    }

    render() {
        return (
            <div className="grid-container">
               {
                    this.studySetList.map((value,idx) => (
                        <SetGridItem key = {idx} set_id = {value} onClick={() => {this.props.onStudySetClick(idx)}}/>
                    ))
               }
            </div>
            
        )
    }
}

export default SetGrid;