import { getContentState } from 'components/convertDraft/convertDraft.js';
import { Editor, EditorState } from 'draft-js';

import './flashCard.css';

export default function FlashCard(props) {
    const term = EditorState.createWithContent(getContentState(props.term));
    const definition = EditorState.createWithContent(getContentState(props.definition));

    return (
        <div className="flash-card-container">
            <div className="fc-term-container">
                <Editor
                    editorState={term}
                    readOnly={true}
                />
            </div>
            <div className="fc-definition-container">
                <Editor
                    editorState={definition}
                    readOnly={true}
                />
            </div>
        </div>
    )
}