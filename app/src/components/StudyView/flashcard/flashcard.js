import React from 'react';

class FlashCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="container">
                <div>{this.props.set_id}</div>
            </div>
        )
    }
}

export default FlashCard;