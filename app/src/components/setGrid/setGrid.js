import React from 'react';

import "./setGrid.css";
import SetGridItem from "./setGridItem/setGridItem.js";

const API_URL = "http://localhost:9000/api/users/sets";

class SetGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studySet: [],
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const body = JSON.stringify({
            authorization: token,
        });

        const settings = {
            method: 'POST',
            headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            body: body,
        };
      
        fetch(API_URL, settings)
            .then(response => response.json())
            .then((data) => {
                this.populateStudySet(data);
            }
        );
    }

    populateStudySet(studySet) {
        const length = studySet.length
        let newStudySet = [];

        for(let i = 0; i < length; i++) 
            newStudySet.push(studySet[i]);
        
        this.setState({
            studySet: newStudySet
        });
    }

    render() {
        return (
            <div className="grid-container">
               {
                    this.state.studySet.map((studySet, idx) => (
                        <SetGridItem 
                            key={idx}
                            id={studySet.id}
                            title={studySet.title}
                            desc={studySet.description}
                        />
                    ))
               }
            </div>
        )
    }
}

export default SetGrid;