import { useEffect } from 'react';
import TagInput from 'components/tagInput/tagInput.js';
import "./SandBox.css";

export default function SandBox(props) {
    const allTags = ['math', 'science', 'english'];

    useEffect(() => {

    }, []);

    const onSubmit = (tags) => {
        console.log(tags);
    }

    return (
        <div className="sandbox-container">
            <TagInput
                onSubmit={onSubmit}
                allTags={allTags}
            />
        </div>

    )
}