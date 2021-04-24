import React from 'react';
import "./setGridItem.css";

function redirect(id) {
    window.location.href = "/sets/" + id + "/cards";
}

export default function SetGridItem(props) {
    return (
        <div className="grid-item" onClick={() => redirect(props.id)}>
            <div className="title">
                {props.title}
            </div>
            <div className="tags-container">
                <div className="tag">Math</div>
                <div className="tag">Science</div>
                <div className="tag">English</div>
            </div>
            <div className="desc">
                {props.desc}
            </div>
        </div>
    )
}