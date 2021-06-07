import { useState, useRef } from 'react';
import TagItem from './tagItem/tagItem.js';
import AutoComplete from './autoComplete/autoComplete.js';

import './tagInput.css';

export default function TagInput(props) {
    const [selectedTags, setSelectedTags] = useState([]);

    const addTag = (tag) => {
        const newSelectedTags = selectedTags.slice();
        newSelectedTags.push(tag);
        setSelectedTags(newSelectedTags);
    }

    const removeTag = (tag) => {
        const newSelectedTags = selectedTags.slice().filter((_tag) => _tag !== tag);
        setSelectedTags(newSelectedTags);
    }

    return (
        <div className="tag-input-container">
            {
                selectedTags.map((tag, idx) => {
                    return (
                        <TagItem
                            key={idx}
                            tag={tag}
                            removeTag={removeTag}
                        />
                    )
                })
            }
            <div className="tag-search-container">
                <AutoComplete
                    allTags={props.allTags}
                    selectedTags={selectedTags}
                    addTag={addTag}
                />
            </div>
        </div>
    );
}