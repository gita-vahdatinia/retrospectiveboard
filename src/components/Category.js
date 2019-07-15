import React from "react";
import { Card } from "react-bootstrap";
import CardPreview from "./CardPreview";
import * as api from "../api";
import equal from "fast-deep-equal";

class Category extends React.Component {
  increaseCount(desc) {
    this.props.upvoted(desc, this.props.color);
  }
  render() {
    const listItems = Object.keys(this.props.items).map(item => {
      return (
        <div className="issues">
            <Card.Body>
              {item}
              <Card.Text className="small_text">
                <small
                  className="text-muted"
                  onClick={this.increaseCount.bind(this, { item })}
                >
                  {this.props.items[item].toString()}
                </small>
              </Card.Text>
              <Card.Text className="card_line"></Card.Text>
            </Card.Body>
        </div>
      );
    });
    return <div>{listItems}</div>;
  }
}

export default Category;
