import React from 'react';
import CardPreview from './CardPreview'
import {Container, Row, Col, Card,Button, OverlayTrigger} from 'react-bootstrap';
import Popup from './Popup'

class TeamBoard extends React.Component{
  state = {
    category : this.props.category,
    showWellPopup: false,
    showBadPopup: false,
    showImprovePopup: false,

  }
  toggleWellPopup() {
   this.setState({
     showWellPopup: !this.state.showWellPopup
   });
 }
 toggleBadPopup() {
  this.setState({
    showBadPopup: !this.state.showBadPopup
  });
}
toggleImprovePopup() {
 this.setState({
   showImprovePopup: !this.state.showImprovePopup
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
              {this.state.showWellPopup ?
               <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.toggleWellPopup.bind(this)}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.toggleWellPopup.bind(this) } >
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
              {this.state.showBadPopup ?
               <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.toggleBadPopup.bind(this)}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.toggleBadPopup.bind(this) } >
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
              {this.state.showImprovePopup ?
               <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.toggleImprovePopup.bind(this)}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.toggleImprovePopup.bind(this) } >
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
