import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import equal from "fast-deep-equal";
import ReportCategory from "./ReportCategory";
class Report extends React.Component {
  state ={
    review: this.props.review
  }
  doneSend(review) {
    this.setState({
      review: ""
    });
    this.props.done("");
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            {" "}
            <Card>
              <Card.Title><h3>Worked on Action Items</h3></Card.Title>
              <Card.Body className={`card_body todo`}>
                <ReportCategory
                  items={this.props.todo}
                  color={`todo`}
                />
              </Card.Body>
            </Card>
            <Card>
              <Card.Title><h3>Worked on Improvement Items</h3></Card.Title>
              <Card.Body className={`card_body bad`}>
                <ReportCategory
                  items={this.props.bad}
                  color={`bad`}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button onClick={this.doneSend.bind(this)}>Done Reviewing</Button>
      </Container>
    );
  }
}

export default Report;
