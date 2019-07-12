import React from 'react';
import CardPreview from './CardPreview'
import {Container, Row, Col, Card,Button} from 'react-bootstrap';
import Popup from './Popup'

class TeamBoard extends React.Component{
  state = {
    category : this.props.category,
    showPopup: false
  }
  togglePopup() {
   this.setState({
     showPopup: !this.state.showPopup
   });
 }
    render() {
      var well = this.state.category.filter(cat =>
        (cat.categoryName == "Well"))

      var bad = this.state.category.filter(cat =>
      (cat.categoryName == "Bad"))

      var action = this.state.category.filter(cat => (
        cat.categoryName =="Action"))

    return (
      <div>
        <Container fluid={true}>
        <Row>
          <Col s={12} md={4}>
            <Card>
              
              {this.state.showPopup ?
               <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.togglePopup.bind(this)}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.togglePopup.bind(this) } >
                Went Well
              </Card.Body>
            </Card>
              {well.map(cat =>
                <Card.Body className="card_body good">
                  {cat.categoryDescription}
                </Card.Body>
              )}
          </Col>
          <Col s={12} md={4}>
            <Card>
              {this.state.showPopup ?
               <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.togglePopup.bind(this)}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.togglePopup.bind(this) } >
              Improve On
              </Card.Body>
            </Card>
              {bad.map(cat =>
                <Card.Body className="card_body improve">
                  {cat.categoryDescription}
                </Card.Body>
              )}
          </Col>
          <Col s={12} md={4}>
            <Card>
              {this.state.showPopup ?
               <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.togglePopup.bind(this)}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.togglePopup.bind(this) } >
              Improve On
              </Card.Body>
            </Card>
            {action.map(cat =>
              <Card.Body className="card_body action">
                {cat.categoryDescription}
              </Card.Body>
            )}
          </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default TeamBoard;
