import React from 'react';
import "./setGrid.css";
import SetGridItem from "./setGridItem/setGridItem.js";

let API_URL = "http://localhost:9000/api/";

class SetGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.match.params.username,
            studySet: [],
        };
    }

    async componentDidMount() {
        const params = JSON.stringify({
            username: this.state.username,
        });

        const settings = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            params: params,
        };
        
        const response = await fetch(API_URL + this.state.username + "/sets", settings);
        
        if(response.status === 201) {
            const json = await response.json();
            this.populateStudySet(json);
        }
        else {
            // TO DO: create a 404 not found page to redirect
        }

    }

    populateStudySet(studySet) {
        const length = studySet.length
        let newStudySet = [];

        for (let i = 0; i < length; i++)
            newStudySet.push(studySet[i]);

        this.setState({
            studySet: newStudySet
        });
    }

    render() {
        return (
            <div className="studyset-container">
                <div className="grid-header-container">
                    <span className="grid-header">All</span>
                    <div></div>
                </div>
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
            </div>
        )
    }
}

export default SetGrid;