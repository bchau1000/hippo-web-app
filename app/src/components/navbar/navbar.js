import React from 'react';
import ReactDOM from 'react-dom';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar-container">
                <ul>
                    <li><a href="#">Study Buddy</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
            </div>
        );
    }
}

export default Navbar;