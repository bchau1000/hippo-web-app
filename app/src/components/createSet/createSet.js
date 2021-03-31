import React from 'react';

import CardForm from "./cardForm/cardForm.js";
import "./createSet.css";

class CreateSet extends React.Component {
    render() {
        return (
            <div className="container">
                <div></div>
                <form className="meta-form">
                    <div className="header">
                        Create a new study set
                    </div>
                    <div className="field-container">
                        <input id="set-title" placeholder="Enter a title..."></input>
                        <div className="field-label">TITLE</div>
                    </div>
                    <div className="field-container">
                        <input id="set-desc" placeholder="Add a description..."></input>
                        <div className="field-label">DESCRIPTION</div>
                    </div>
                </form>
                <div className="center-container">
                    <CardForm></CardForm>
                    <CardForm></CardForm>
                    <CardForm></CardForm>
                    <CardForm></CardForm>
                    <CardForm></CardForm>
                    <CardForm></CardForm>
                    <CardForm></CardForm>
                    <CardForm></CardForm>
                </div>
                <div className="submit-container"></div>
            </div>
        )
    }
}

export default CreateSet;

/*


<input id="title" placeholder="Enter a title..."></input>
                        <div className="field-label">TITLE</div>
*/