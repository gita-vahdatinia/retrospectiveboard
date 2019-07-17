import React from "react";
import { Card, Form } from "react-bootstrap";
import CardPreview from "./CardPreview";
import * as api from "../api";
import equal from "fast-deep-equal";

class ReportCategory extends React.Component {
  increaseCount(desc) {
    this.props.upvoted(desc, this.props.color);
  }

  render() {
    const listItems = Object.keys(this.props.items || {}).map(item => {
      return (
        <div className="issues">
          <Card.Body>
            {item}
            <Card.Text >
              <Form className="checkbox">
              <div key={`custom-inline-checkbox`} className="mb-3 " style={{'textAlign': "right"}}>
                <Form.Check
                  custom
                  inline
                  label="Yes"
                  type='checkbox'
                  id={`custom-inline-${item}-1`}
                />
                <Form.Check
                  custom
                  inline
                  label="No"
                  type='checkbox'
                  id={`custom-inline-${item}-2`}
                />
              </div>
          </Form>
            </Card.Text>
            <Card.Text className="card_line"></Card.Text>
          </Card.Body>
        </div>
      );
    });
    return <div>{listItems}</div>;
  }
}

export default ReportCategory;
