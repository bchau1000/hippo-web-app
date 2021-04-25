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
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            const body = JSON.stringify({
                authorization: user.token,
            });

            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token,
                },
                body: body,
            };

            const response = await fetch(API_URL, settings);
            const json = await response.json();
            this.populateStudySet(json);
        }
        else {

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