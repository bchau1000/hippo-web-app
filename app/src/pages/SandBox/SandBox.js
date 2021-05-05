import { useState, useEffect } from 'react';
import "./SandBox.css";

export default function SandBox(props) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        console.log(showContent);
    }, [showContent]);

    useEffect(() => {

    }, []);

    return (
        <div className="sandbox-wrapper">
            
            <section className="sandbox-container">
                <div className="sb-button-container">
                    <button onClick={() => setShowContent(current => !current)}>
                        <span>Show/hide</span>
                    </button>
                </div>
                <div className={`sb-sidebar-container ${showSidebar ? "sb-show" : "sb-hide"}`}>
                    <button className="sb-sidebar-button" onClick={() => console.log("Clicked")}>
                        <span>Home</span>
                    </button>
                </div>
                <div className={`sb-content-container ${showContent ? "sb-content-show": "sb-content-hide"}`}>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                    <div className="sb-content-item"/>
                </div>
            </section>
        </div>

    )
}