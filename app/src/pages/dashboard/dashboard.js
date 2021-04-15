import React from "react";

import "./dashboard.css";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageView: "SetGrid",
            studySetList: [1, 20, 30, 40, 50, 60, 70, 80],
            currentSet: null,
        };
    }

    async componentDidMount() {
        console.log(localStorage.getItem('token'));
    }


    render() {
        return (
            <div className="main-container">

            </div>
        );
    }
}

export default Dashboard;
