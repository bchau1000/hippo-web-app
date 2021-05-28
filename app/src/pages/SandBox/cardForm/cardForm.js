import { useState, useEffect } from 'react';
import { getContentState, getRawHtml } from 'components/convertDraft/convertDraft.js';
import { Editor, EditorState, getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';
import './cardForm.css';
import 'draft-js/dist/Draft.css';


export default function CardForm(props) {
    const [termBorder, setTermBorder] = useState(false);
    const [termEditor, setTermEditor] = useState(() => EditorState.createEmpty());
    const [term, setTerm] = useState(getRawHtml(termEditor));

    const [displayTerm, setDisplayTerm] = useState(() => EditorState.createEmpty());

    const [styleSelected, setStyleSelected] = useState(new Array(5).fill(false));
    const [styles, setStyles] = useState([]);

    useEffect(() => {
        setTerm(getRawHtml(termEditor));
    }, [termEditor]);

    useEffect(() => {
        const styleMap = ['BOLD', 'ITALIC', 'UNDERLINE', '', ''];
        let newStyles = [];

        for(let i = 0; i < styleSelected.length; i++)
            if(styleSelected[i])
                newStyles.push(styleMap[i]);

        setStyles(newStyles);
    }, [styleSelected]);

    useEffect(() => {
    }, [styles])

    const submit = async () => {
        const body = JSON.stringify({
            'term': term
        });

        const settings = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        }

        const response = await fetch('/api/richtext', settings);

        if (response.status === 200) {
            const json = await response.json();
            const state = getContentState(json[json.length - 1].term);
            setDisplayTerm(EditorState.createWithContent(state));
        }
    }

    const handleKey = (event) => {
        //if(event.ctrlKey && event.keyCode === 66) {
        //    
        //}
        console.log(getDefaultKeyBinding(event));
        return getDefaultKeyBinding(event);
    }

    const toggleStyle = (event, idx, value) => {
        event.preventDefault();

        let selected = styleSelected.slice();
        selected[idx] = !selected[idx];

        const state = RichUtils.toggleInlineStyle(termEditor, value);

        setTermEditor(state);
        setStyleSelected(selected);
    }

    return (
        <div className="card-form-container">
            <div className="card-header-container">
                <span>0</span>
                <span className="material-icons">delete</span>
            </div >
            <div className="card-term-container">
                <div className="card-term-editor-options">
                    <button 
                        className={`${styleSelected[0] ? "selected" : "not-selected"}`}
                        key={'bold'} 
                        onMouseDown={(event) => toggleStyle(event, 0, 'BOLD')}
                    >
                        <span className="material-icons">format_bold</span>
                    </button>
                    <button
                        className={`${styleSelected[1] ? "selected" : "not-selected"}`}
                        key={'italic'}
                        onMouseDown={(event) => toggleStyle(event, 1, 'ITALIC')}
                    >
                        <span className="material-icons">format_italic</span>
                    </button>
                    <button
                        className={`${styleSelected[2] ? "selected" : "not-selected"}`}
                        key={'underline'}
                        onMouseDown={(event) => toggleStyle(event, 2, 'UNDERLINE')}
                    >
                        <span className="material-icons">format_underline</span>
                    </button>
                    <button
                        className={`${styleSelected[3] ? "selected" : "not-selected"}`}
                        key={'bullet'}
                    >
                        <span className="material-icons">format_list_bulleted</span>
                    </button>
                    <button
                        className={`${styleSelected[4] ? "selected" : "not-selected"}`}
                        key={'numbered'}
                    >
                        <span className="material-icons">format_list_numbered</span>
                    </button>
                </div>
                <div className={`card-term-editor ${termBorder ? "card-focus" : ""}`}>
                    <Editor
                        editorState={termEditor}
                        onChange={setTermEditor}
                        spellCheck={true}
                        onFocus={() => { setTermBorder(true) }}
                        onBlur={() => { setTermBorder(false) }}
                    />
                </div>
            </div>

            <div className="card-definition-container">
                <Editor
                    editorState={displayTerm}
                    readOnly={true}
                />
            </div>
            <button onClick={() => submit()}>Submit</button>
        </div>
    )
}