import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import "./cardForm.css";

export default function CardForm(props) {
    return(
        <form className="card-container">
            <div className="options">
                <div className="left">{props.cardNum}</div>
                <div className="right">
                    <DeleteIcon className="icon delete-icon" onClick={() => props.delete(props.cardNum)}></DeleteIcon>
                    <CloseIcon className="icon clear-icon" onClick={() => props.clear(props.cardNum)}></CloseIcon>
                </div>
            </div>
            <div className="term">
                <textarea id="card-term" placeholder="Enter term"></textarea>
                <label htmlFor="card-term">TERM</label>
            </div>
            <div className="divider"></div>
            <div className="def">
                <textarea id="card-def" placeholder="Enter definition"></textarea>
                <label htmlFor="card-def">DEFINITION</label>
            </div>
        </form>
    );
}