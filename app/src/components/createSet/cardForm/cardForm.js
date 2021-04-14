import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import "./cardForm.css";


export default function CardForm(props){

        return (<form id="card-form" className="card-container">
            <div className="options">
                <div className="left">{props.cardNum}</div>
                <div className="right">
                    <DeleteIcon className="icon delete-icon" onClick={() => props.delete(props.cardNum)}></DeleteIcon>
                    <CloseIcon className="icon clear-icon" onClick={() => props.clear(props.cardNum)}></CloseIcon>
                </div>
            </div>
            <div className="term">
                <TextareaAutosize
                    form="card-form" 
                    placeholder="Enter term" 
                    value={props.info.term}
                    onChange={event => props.setTerm(props.cardNum, event.target.value)}
                />
                <label htmlFor="card-term">TERM</label>
            </div>
            <div className="divider"></div>
            <div className="def">
                <TextareaAutosize
                    form="card-form" 
                    placeholder="Enter definition"
                    value={props.info.def}
                    onChange={event => props.setDef(props.cardNum, event.target.value)}
                />
                <label htmlFor="card-def">DEFINITION</label>
            </div>
        </form>
    );
}
