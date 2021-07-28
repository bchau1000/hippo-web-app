import TagInput from 'components/tagInput/tagInput.js';
import './metaForm.css';

export default function MetaForm(props) {
    return (
        <form className="meta-container">
            <div className="meta-field">
                <input
                    className="meta-form-input"
                    id="title"
                    type="text"
                    placeholder="Enter a title..."
                    value={props.title}
                    onChange={(event) => props.setTitle(event.target.value)}
                />
                <label htmlFor="title">TITLE</label>
            </div>
            <div className="meta-field">
                <input
                    className="meta-form-input"
                    id="description"
                    type="text"
                    placeholder="Enter a description..."
                    value={props.description}
                    onChange={(event) => { props.setDescription(event.target.value) }}
                />
                <label htmlFor="description">DESCRIPTION</label>
            </div>
            <div className="meta-field"> 
                <TagInput
                    allTags={props.allTags}
                    selectedTags={props.selectedTags}
                    setSelectedTags={props.setSelectedTags}
                />
                <label htmlFor="description">TAGS</label>
            </div>

        </form>
    )
}