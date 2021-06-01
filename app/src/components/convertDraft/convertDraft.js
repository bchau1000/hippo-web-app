import {stateToHTML} from 'draft-js-export-html';
import { ContentState, convertFromHTML } from 'draft-js';

export function getContentState(html) {
    const blocks = convertFromHTML(html);
    
    return ContentState.createFromBlockArray(
        blocks.contentBlocks,
        blocks.entityMap,
    );
}

export function getRawHtml(editor) {
    return stateToHTML(editor.getCurrentContent());
}