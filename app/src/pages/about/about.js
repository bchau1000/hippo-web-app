import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar.js';
import Topbar from '../../components/topbar/topbar.js';
import './about.css';

const topbarHeight = 65;

class About extends React.Component {
    render() {
        return (
            <main>
                <div>
                    //<Topbar height={topbarHeight}></Topbar>//
                    
                </div>
                
                <p1 className="header-container"> Study Buddy is a TuffyHacks
                 2021, 1 day Hackathon project produced by 4(3?) guys. It attempts 
                 to utilizes React and MySQL to create a app that works in the same vein
                 as the popular website Quizlet. Study Buddy is an application to help 
                 establish better studying habits and remember large loads of information 
                 with spaced learning.  
                    </p1>

            </main>
        );
    }
}

export default About;