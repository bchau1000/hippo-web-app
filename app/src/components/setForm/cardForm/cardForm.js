import { useState, useEffect } from 'react';
import RichTextArea from 'components/richTextArea/richTextArea.js';
import { getContentState, getRawHtml } from 'components/convertDraft/convertDraft.js';
import { EditorState, RichUtils } from 'draft-js';
import './cardForm.css';
import 'draft-js/dist/Draft.css';


export default function CardForm(props) {
    const idx = props.idx;
    const {updateCards} = props;
    const termState = getContentState(props.flashCard.term);
    const [termEditor, setTermEditor] = useState(() => EditorState.createWithContent(termState));
    const [termStyles, setTermStyles] = useState(new Array(5).fill(false));

    const definitionState = getContentState(props.flashCard.definition);
    const [definitionEditor, setDefinitionEditor] = useState(() => EditorState.createWithContent(definitionState));
    const [definitionStyles, setDefinitionStyles] = useState(new Array(5).fill(false));
    
    useEffect(() => {
        const flashCard = {
            'term': getRawHtml(termEditor).toString(),
            'definition': getRawHtml(definitionEditor).toString(),
            'plainText': termEditor.getCurrentContent().getPlainText() + definitionEditor.getCurrentContent().getPlainText()
        }

        updateCards(idx, flashCard);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [termEditor, definitionEditor, idx]);

    const toggleTermStyle = (event, idx, value) => {
        event.preventDefault();
        let state;
        if(value === 'unordered-list-item' || value === 'ordered-list-item')
            state = RichUtils.toggleBlockType(termEditor, value);
        else
            state = RichUtils.toggleInlineStyle(termEditor, value);

        const newStyles = termStyles.slice();
        newStyles[idx] = !newStyles[idx];

        setTermStyles(newStyles);
        setTermEditor(state);
    }

    const toggleDefinitionStyle = (event, idx, value) => {
        event.preventDefault();
        let state;

        if(value === 'unordered-list-item' || value === 'ordered-list-item')
            state = RichUtils.toggleBlockType(definitionEditor, value);
        else
            state = RichUtils.toggleInlineStyle(definitionEditor, value);
        

        const newStyles = definitionStyles.slice();
        newStyles[idx] = !newStyles[idx];

        setDefinitionStyles(newStyles);
        setDefinitionEditor(state);
    }

    return (
        <div className="card-form-container">
            <div className="card-header-container">
                <span>{props.idx + 1}</span>
                <button className="remove-card-button" onClick={() => props.removeCard(props.idx)}>
                    <span className="material-icons">delete</span>
                </button>
                
            </div >
            <div className="card-term-container">
                <RichTextArea
                    editor={termEditor}
                    setEditor={setTermEditor}
                    toggleStyle={toggleTermStyle}
                    styles={termStyles}
                />
            </div>

            <div className="card-definition-container">
                <RichTextArea
                    editor={definitionEditor}
                    setEditor={setDefinitionEditor}
                    toggleStyle={toggleDefinitionStyle}
                    styles={definitionStyles}
                />
            </div>
        </div>
    )
}