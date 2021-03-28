import React from "react";

import Navbar from "../../components/navbar/navbar.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import SetGrid from "../../components/setGrid/setGrid.js";
import CreateSet from "../../components/createSet/createSet.js";
import StudyView from "../../components/StudyView/StudyView.js";
import "./dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPageView: "SetGrid", selectedSet: null };
    this.studySetList = [10,20,30,40,50,60,70,80];
    this.currentSet = null;
  }
  getSetFromIdx(index)
  {
    this.currentSet = this.studySetList[index];
  }
  getPageViewDom() {
    switch (this.state.currentPageView) {
      case "SetGrid":
        return (
          <SetGrid
            studySetList = {this.studySetList}
            onStudySetClick={
                (idx) => {
                    this.getSetFromIdx(idx);
                    this.setState({ currentPageView: "StudyView"});
                }}
          />
        );
      case "CreateSet":
        return <CreateSet />;
      case "StudyView":
        return <StudyView set_id = {this.currentSet} />;
        default: return <div>Error</div>;
    }
  }

  render() {
    return (
      <div className="main-container">
        <Navbar />
        <Sidebar
          clickCreate={() => this.setState({ currentPageView: "CreateSet" })}
          clickSet={() => this.setState({ currentPageView: "SetGrid" })}
        />
        {this.getPageViewDom()}
      </div>
    );
  }
}

export default Dashboard;
