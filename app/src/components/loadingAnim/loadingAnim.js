import "./loadingAnim.css";

export default function LoadingAnim(props) {
    return (
        <section class="loading-container" style={{gridArea: props.gridArea}}>
            <div class="loading-anim">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span>Loading...</span>
        </section>

    )
}