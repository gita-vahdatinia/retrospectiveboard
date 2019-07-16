import React from "react";
import CardPreview from "./CardPreview";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Popup from "./Popup";
import * as api from "../api";
import equal from "fast-deep-equal";
import Category from "./Category";
class TeamBoard extends React.Component {
  state = {
    showWellPopup: false,
    showBadPopup: false,
    showImprovePopup: false,
    team: this.props.team,
    sprint: this.props.sprint,
    well: [],
    bad: [],
    todo: [],
    welldata: "",
    currentCat: "",
    description: "",
    retro_type: "",
  };

  getDataFromChild = (cat, data) => {
    this.setState({ welldata: data });
    this.setState({ currentCat: cat });
  };

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
  callIncrease = (desc, color) => {
    api.upVote(this.props.team, this.props.sprint, color, desc.item)
    .then(resp =>
    this.fetchingLists())
  }
  fetchingLists() {
    api.fetchItems(this.props.team, this.props.sprint)
    .then(items => {
      this.setState({
        bad: items.bad,
        well: items.well,
        todo: items.todo
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (!equal(this.state.welldata, prevState.welldata)) {
      api
        .postDescription(
          this.props.team,
          this.props.sprint,
          this.state.currentCat,
          this.state.welldata
        )
        .then(value => this.fetchingLists());
    }
    if(!equal(this.props.sprint, prevProps.sprint )){
      this.fetchingLists()
    }
  }
  render() {
    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col s={12} md={4}>
              <Card>
                {this.state.showWellPopup ? (
                  <Popup
                    text='Click "Close Button" to hide popup'
                    closePopup={this.toggleWellPopup.bind(this)}
                    category={"well"}
                    sendData={this.getDataFromChild}
                  />
                ) : null}
                <Card.Body
                  className="card_title"
                  onClick={this.toggleWellPopup.bind(this)}
                >
                  Went Well
                </Card.Body>
              </Card>
              <Card.Body className={'card_body well'}>
              <Category items={this.state.well} color={"well"} upvoted={this.callIncrease.bind(this)}/>
              </Card.Body>

          </Col>
            <Col s={12} md={4}>
              <Card>
                {this.state.showBadPopup ? (
                  <Popup
                    text='Click "Close Button" to hide popup'
                    closePopup={this.toggleBadPopup.bind(this)}
                    category={"bad"}
                    sendData={this.getDataFromChild}
                  />
                ) : null}
                <Card.Body
                  className="card_title"
                  onClick={this.toggleBadPopup.bind(this)}
                >
                  Improve On
                </Card.Body>
              </Card>
              <Card.Body className={'card_body bad'}>
              <Category items={this.state.bad} color={"bad"} upvoted={this.callIncrease.bind(this)}/>
              </Card.Body>
          </Col>
            <Col s={12} md={4}>
              <Card>
                {this.state.showImprovePopup ? (
                  <Popup
                    text='Click "Close Button" to hide popup'
                    closePopup={this.toggleImprovePopup.bind(this)}
                    category={"todo"}
                    sendData={this.getDataFromChild}
                  />
                ) : null}
                <Card.Body
                  className="card_title"
                  onClick={this.toggleImprovePopup.bind(this)}
                >
                  To Do
                </Card.Body>
              </Card>
              <Card.Body className={'card_body todo'}>
              <Category items={this.state.todo} color={"todo"} upvoted={this.callIncrease.bind(this)}/>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TeamBoard;
