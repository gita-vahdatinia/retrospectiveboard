import React from 'react';
import CardPreview from './CardPreview'
import {Container, Row, Col, Card} from 'react-bootstrap';

const TeamBoard = ({category})=> {

  var well = category.filter(cat =>
    (cat.categoryName == "Well"))

  var bad = category.filter(cat =>
  (cat.categoryName == "Bad"))

  var action = category.filter(cat => (
    cat.categoryName =="Action"))

    return (
      <div>
        <Container fluid={true}>
        <Row>
          <Col s={12} md={4}>
            <Card bg="success" >
              <Card.Body className="card_title">
                Went Well
              </Card.Body>
            </Card>
              {well.map(cat =>
                <CardPreview key={cat.id} {...cat} />
              )}
          </Col>
          <Col s={12} md={4}>
            <Card bg="warning" >
              <Card.Body className="card_title">
                Improve On
              </Card.Body>
            </Card>
            {bad.map(cat =>
              <CardPreview key={cat.id} {...cat} />
            )}
          </Col>
          <Col s={12} md={4}>
            <Card bg="info" >
                <Card.Body className="card_title">
                  Action Items
                </Card.Body>
            </Card>
            {action.map(cat =>
              <CardPreview key={cat.id} {...cat} />
            )}
          </Col>
        </Row>
        </Container>
      </div>
    );
}

export default TeamBoard;
