import React from "react";
import FlashCard from "./flashcard/flashcard.js";
 import "./StudyView.css";
import axios from "axios";
const API_URL = "http://localhost:9000/api/sets/cards/";
class StudyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      set_id: this.props.set_id,
      set_qualities: {},
      flash_cards: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  async componentDidMount() {
    const response = await fetch(API_URL + this.state.set_id);
    const data = await response.json();
    this.setState({
      set_qualities: data[0].set_qualities,
      flash_cards: data[0].flash_cards,
    });
  }
  render() {
    return (
      <div id="study-view-container">
        <div>{this.state.set_qualities.setName}</div>
        <div>{this.state.set_qualities.set_description}</div>
        {
         
          this.state.flash_cards.map(obj => (
            <FlashCard desc={obj.flashName} name={obj.flashDef}/>
          ))
  
        }
      </div>
    );
  }
}

export default StudyView;
