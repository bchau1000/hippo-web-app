import "./navbar.css";


export default function Navbar(props) {
    const width = props.width;

    return (
        <div 
            className={`navbar-container no-select ${props.showDropdown && width > 1025 ? "add-margin" : "rem-margin"}`}
        >
            <div className="left">
                <div className="dropdown" onClick={() => { props.onClick() }}>
                    {
                        props.showDropdown
                            ? <span className="material-icons">close</span>
                            : <span className="material-icons">reorder</span>
                    }
                </div>
            </div>
            <div className="right">
            </div>
        </div>
    )
}