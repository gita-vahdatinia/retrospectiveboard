import React from "react";
import { Card } from "react-bootstrap";
import CardPreview from "./CardPreview";
import * as api from '../api'
import equal from "fast-deep-equal";

class Category extends React.Component {

  increaseCount = () => {
    api.upVote("tools", "4", "well", "whatagain")
    .then(resp => console.log("Upvoted"))
    this.props.upvoted()
  }

  render() {
    return (
      <div className="issues">
        <Card.Body className={`card_body ${this.props.color}`}>
          {this.props.items.map(item =>
            Object.keys(item).map(keyName => (
              <Card.Body>
                {keyName}
                <Card.Text className="small_text">
                  <small className="text-muted" onClick={this.increaseCount}>{item[keyName]}</small>
                </Card.Text>
                <Card.Text className="card_line"></Card.Text>
              </Card.Body>
            ))
          )}
        </Card.Body>
      </div>
    );
  }
}

export default Category;
