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
  fetchingLists() {
    api
      .fetchItems(this.props.team, this.props.sprint, "bad")
      .then(bad_items => {
        this.setState({
          bad: bad_items
        });
      });
    api
      .fetchItems(this.props.team, this.props.sprint, "well")
      .then(well_items => {
        this.setState({
          well: well_items
        });
      });
    api
      .fetchItems(this.props.team, this.props.sprint, "todo")
      .then(todo_items => {
        this.setState({
          todo: todo_items
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
              <Category items={this.state.well} color={"good"} upvoted={this.fetchingLists.bind(this)}/>
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
              <Category items={this.state.bad} color={"improve"} />
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
              <Category items={this.state.todo} color={"action"} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TeamBoard;
