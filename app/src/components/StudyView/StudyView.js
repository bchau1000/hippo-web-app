import React from 'react';
import FlashCard from './flashcard/flashcard.js'
import axios from 'axios';
const API_URL = "http://localhost:9000/api/sets";
class StudyView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount()
    {
        axios
      .get(API_URL, {set_id: this.props.set_id})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    render() {
        return (
            <div id="container">
                <FlashCard />
            </div>
        )
    }

}

export default StudyView;