import React from 'react';
import "./WelcomePage.css";

export default function WelcomePage(props) {
    return (
        <section className="welcome-container">
            <div className="banner-container">
                <div className="banner-title-container">
                    <span className="banner-title">Hippo.</span>
                    <span className="banner-summary">Create, browse, and learn from study sets to help you improve your grades. </span>
                    <button 
                        className="start-container" 
                        onClick={() => {
                            if(!props.user)
                                props.setShowLoginModal(true)
                            else
                                window.location.href = "/" + props.user.username + "/sets";
                        }}
                    >
                        <span className="start-text">Get Started</span>
                    </button>
                </div>
            </div>

        </section>
    );
}