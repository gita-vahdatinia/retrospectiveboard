import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';

const TeamBoard = ({})=> {
    return (
      <div>
        <Container fluid={true}>
        <Row>
          <Col>
            <Card bg="success">
              <Card.Body className="card_title">
                What Went Well
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="warning">
              <Card.Body className="card_title">
                What We Can Improve On
              </Card.Body>
            </Card></Col>
          <Col>
            <Card bg="info">
                <Card.Body className="card_title">
                  Action Items
                </Card.Body>
            </Card></Col>
        </Row>
        </Container>
      </div>
    );
}

export default TeamBoard;
