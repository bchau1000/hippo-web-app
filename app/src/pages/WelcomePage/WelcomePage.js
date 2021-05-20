import React from 'react';
import "./WelcomePage.css";

class WelcomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('User logged in...');
        }
    }

    render() {
        return (
            <section className="welcome-container">
                <div className="banner-container">
                    <div className="banner-title-container">
                        <span className="banner-title">Hippo.</span>
                        <span className="banner-summary">Create, browse, and learn from study sets to help you improve your grades. </span>
                        <button className="start-container" onClick={() => this.props.setShowLoginModal(true)}>
                            <span className="start-text">Get Started</span>
                        </button>
                    </div>
                </div>
                
            </section>
        );
    }
}

export default WelcomePage;