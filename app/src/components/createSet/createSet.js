import React from 'react';

import "./createSet.css";

class CreateSet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="meta-container"></div>
                <div className="card-container"></div>
                <div className="submit-container"></div>
            </div>
        )
    }
}

export default CreateSet;