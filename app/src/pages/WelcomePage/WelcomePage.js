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
                        <span className="banner-title">HIPPO</span>
                        <span className="banner-summary">Create, browse, and learn from study sets to help you improve your grades. </span>
                        <a className="start-container" href="/">
                            <span className="start-text">Get Started</span>
                        </a>
                    </div>
                </div>
                <div className="features-container">
                        <div></div>
                        <div className="features-grid-item">
                            <span className="features-header">
                                Create
                            </span>
                            <p className="features-info">
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                            </p>
                        </div>
                        <div className="features-grid-item">
                            <span className="features-header">
                                Browse
                            </span>
                            <p className="features-info">
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                            </p>
                        </div>
                        <div className="features-grid-item">
                            <span className="features-header">
                                Learn
                            </span>
                            <p className="features-info">
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                                Insert some flavor text describing the parts of our app that support this header.
                            </p>
                        </div>
                        <div></div>
                </div>
            </section>
        );
    }
}

export default WelcomePage;