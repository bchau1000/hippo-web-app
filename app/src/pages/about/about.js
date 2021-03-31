import React from 'react';
import Topbar from '../../components/topbar/topbar.js';
import './about.css';

const topbarHeight = 65;

class About extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Topbar height={topbarHeight}></Topbar>

                </div>
                <div className="about">
                    Study Buddy is a TuffyHacks
                    2021, 1 day Hackathon project produced by 4(3?) guys. It attempts
                    to utilizes React and MySQL to create a app that works in the same vein
                    as the popular website Quizlet. Study Buddy is an application to help
                    establish better studying habits and remember large loads of information
                    with spaced learning.
                </div>
            </div>
        );
    }
}

export default About;