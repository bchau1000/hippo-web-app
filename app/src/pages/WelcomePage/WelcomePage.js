import React from 'react';
import { useHistory } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
    const history = useHistory();
    return (
        <section className="welcome-container">
            <div className="banner-container">
                <div className="banner-title-container">
                    <span className="banner-title">Hippo.</span>
                    <span className="banner-summary">Learn from study sets to help you improve your grades. </span>
                    <button 
                        className="start-container" 
                        onClick={() => history.push("/browse") }
                    >
                        <span className="start-text">Get Started</span>
                    </button>
                </div>
            </div>

        </section>
    );
}