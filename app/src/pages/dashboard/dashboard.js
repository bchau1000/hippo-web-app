import React from 'react';

import Navbar from '../../components/navbar/navbar.js';
import Sidebar from '../../components/sidebar/sidebar.js';
import SetGrid from '../../components/setGrid/setGrid.js';
import CreateSet from '../../components/createSet/createSet.js';
import './dashboard.css';



class Dashboard extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {currentPageView : "SetGrid"};
    }
    getPageViewDom()
    {
        switch(this.state.currentPageView)
        {
            case 'SetGrid':
                return (<SetGrid/>);
            case 'CreateSet':
                return (<CreateSet/>);
        }
    }
    render() {
        return (
            <div className="main-container">
                <Navbar/>
                <div className="indent"></div>
                <Sidebar 
                    clickCreate={() => this.setState({currentPageView :"CreateSet"})} 
                    clickSet={() =>this.setState({currentPageView :"SetGrid"})} />
                {this.getPageViewDom()}
            </div>
        );
    }
}

export default Dashboard;