import React from "react";
import { Card } from "react-bootstrap";
import CardPreview from "./CardPreview";
import * as api from '../api'
import equal from "fast-deep-equal";

class Category extends React.Component {
  state = {
    team: "tools",
    sprint: "4",
    retro_type: "well",
    description: "whatagain"

  }
  increaseCount = () => {
    api.upVote(this.state.team, this.state .sprint, this.state.retro_type, this.state.description)
    .then(resp => console.log("Upvoted"))
    console.log(this.props)
    this.props.upvoted()
    console.log("Here")

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
