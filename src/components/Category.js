import React from "react";
import { Card } from "react-bootstrap";
import CardPreview from "./CardPreview";

class Category extends React.Component {
  render() {
    return (
      <div className="issues">
        <Card.Body className={`card_body ${this.props.color}`}>
          {this.props.items.map(item =>
            Object.keys(item).map((keyName, keyIndex) => (
              <Card.Body>
                {keyName}
                <Card.Text className="small_text">
                  <small className="text-muted">{keyIndex}</small>
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
