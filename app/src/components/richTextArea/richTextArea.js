import { useState } from 'react';
import { Editor } from 'draft-js';

import './richTextArea.css';

export default function RichTextArea(props) {
    const [border, setBorder] = useState(false);

    return (
        <div className="richtext-container">
            <div className="richtext-editor-options">
                <button
                    className={`${props.styles[0] ? "selected" : "not-selected"}`}
                    onMouseDown={(event) => props.toggleStyle(event, 0, 'BOLD')}
                >
                    <span className="material-icons">format_bold</span>
                </button>
                <button
                    className={`${props.styles[1] ? "selected" : "not-selected"}`}
                    onMouseDown={(event) => props.toggleStyle(event, 1, 'ITALIC')}
                >
                    <span className="material-icons">format_italic</span>
                </button>
                <button
                    className={`${props.styles[2] ? "selected" : "not-selected"}`}
                    onMouseDown={(event) => props.toggleStyle(event, 2, 'UNDERLINE')}
                >
                    <span className="material-icons">format_underline</span>
                </button>
                <button
                    onMouseDown={(event) => props.toggleStyle(event, 3, 'unordered-list-item')}
                >
                    <span className="material-icons">format_list_bulleted</span>
                </button>
                <button
                    onMouseDown={(event) => props.toggleStyle(event, 3, 'ordered-list-item')}
                >
                    <span className="material-icons">format_list_numbered</span>
                </button>
            </div>
            <div className={`richtext-editor ${border ? "card-focus" : ""}`}>
                <Editor
                    editorState={props.editor}
                    onChange={props.setEditor}
                    spellCheck={true}
                    onFocus={() => { setBorder(true) }}
                    onBlur={() => { setBorder(false) }}
                />
            </div>
        </div>
    )
}