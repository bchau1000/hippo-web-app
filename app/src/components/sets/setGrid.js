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

    async componentDidMount() {
        const token = localStorage.getItem('token');
        
        if(token) {
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
          
            const response = await fetch(API_URL, settings);
            const json = await response.json();
            this.populateStudySet(json);
        }
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
                            onClick={this.redirect}
                        />
                    ))
               }
            </div>
        )
    }
}

export default SetGrid;