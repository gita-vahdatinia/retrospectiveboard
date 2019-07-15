import React from 'react';
import CardPreview from './CardPreview'
import {Container, Row, Col, Card,Button, OverlayTrigger} from 'react-bootstrap';
import Popup from './Popup'
import * as api from '../api';
import equal from 'fast-deep-equal'


class TeamBoard extends React.Component{
  state = {
    category : this.props.category,
    showWellPopup: false,
    showBadPopup: false,
    showImprovePopup: false,
    team: this.props.team,
    sprint: this.props.sprint,
    well: [],
    bad: [],
    action: [],
    welldata: "",
    currentCat: ""
  }

  getDataFromChild = (cat, data) => {
    this.setState({welldata:data})
    this.setState({currentCat: cat})
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


  componentDidUpdate(prevProps, prevState) {
    if(!equal(this.props.sprint, prevProps.sprint)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      api.fetchBad(this.props.team, this.props.sprint).then(bad_items =>{
        this.setState({
          bad: bad_items
        })
      })
      api.fetchWell(this.props.team, this.props.sprint).then(well_items =>{
        this.setState({
          well: well_items[0]
        })
      })
      api.fetchAction(this.props.team, this.props.sprint).then(action_items =>{
        this.setState({
          action: action_items
        })
      })
      }

      if(!equal(this.state.welldata, prevState.welldata)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      {
        api.postDescription(this.props.team, this.props.sprint, this.state.currentCat, this.state.welldata).then(value=> {
          console.log(value)
          api.fetchWell(this.props.team, this.props.sprint).then(well_items =>{
            this.setState({
              well: well_items[0]
            })
          })
        })
      }
  }
    render() {
      var well = this.state.category.filter(cat =>
        (cat.categoryName == "Well"))


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
                category ={"well"}
                sendData = {this.getDataFromChild}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.toggleWellPopup.bind(this) } >
                Went Well
              </Card.Body>
            </Card>
              {this.state.well.map(cat =>
                <Card.Body className="card_body good">
                  {cat}
                </Card.Body>
              )}
          </Col>
          <Col s={12} md={4}>
            <Card>
              {this.state.showBadPopup ?
               <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.toggleBadPopup.bind(this)}
                category ={"bad"}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.toggleBadPopup.bind(this) } >
              Improve On
              </Card.Body>
            </Card>
              {this.state.bad.map(cat =>
                <Card.Body className="card_body improve">
                  {cat}
                </Card.Body>
              )}
          </Col>
          <Col s={12} md={4}>
            <Card>
              {this.state.showImprovePopup ?
               <Popup
                text='Click "Close Button" to hide popup'
                closePopup={this.toggleImprovePopup.bind(this)}
                category ={"improve"}
               />
               : null
              }
              <Card.Body className="card_title" onClick={this.toggleImprovePopup.bind(this) } >
              Action Items
              </Card.Body>
            </Card>
            {this.state.action.map(cat =>
              <Card.Body className="card_body action">
                {cat}
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
