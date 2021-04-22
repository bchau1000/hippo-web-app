import React from 'react';
import Sidebar from '../../components/sidebar/sidebar.js';
import "./welcome.css";

class WelcomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token) {
            console.log('User logged in...');
        }
    }

    render() {
        return (
            <section>

            </section>
        );
    }
}

export default WelcomePage;