import "./profilePic.css";

export default function ProfilePic(props) {
    const style = {
        height: props.dimensions,
        width: props.dimensions,
        fontSize: props.fontSize,
    }
    return(
        <div 
            className="profile-pic-container" 
            style={style}
        >
            <span className="profile-pic-img">
                {props.username[0].toUpperCase()}
            </span>
        </div>
    )
}