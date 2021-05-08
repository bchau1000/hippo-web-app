import "./loadingAnim.css";

export default function LoadingAnim(props) {
    return (
        <section className="loading-container" style={{gridArea: props.gridArea}}>
            <div className="loading-anim">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span>Loading...</span>
        </section>

    )
}