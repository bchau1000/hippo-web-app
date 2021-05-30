import './metaForm.css';

export default function MetaForm(props) {
    return (
        <form className="meta-container">
            <div>
                <input 
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
                    id="description" 
                    type="text" 
                    placeholder="Enter a description..."
                    value={props.description}
                    onChange={(event) => { props.setDescription(event.target.value) }}
                />
                <label htmlFor="description">DESCRIPTION</label>
            </div>
        </form>
    )
}