import React from "react";
import CardPreview from "./CardPreview";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Popup from "./Popup";
import * as api from "../api";
import equal from "fast-deep-equal";
import Category from "./Category";
import Header from "./Header";
import Splash from "./Splash";

const pushState = (obj, url) => window.history.pushState(obj, "", url);

class TeamBoard extends React.Component {
  state = this.props.initialData;

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
    api
      .upVote(this.state.team, this.state.sprint, color, desc.item)
      .then(resp => this.fetchingLists());
  };
  fetchingLists() {
    api.fetchItems(this.state.team, this.state.sprint).then(items => {
      this.setState({
        bad: items.bad,
        well: items.well,
        todo: items.todo
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (!equal(this.state.sprint, "")) {
    }
    if (!equal(this.state.welldata, prevState.welldata)) {
      api
        .postDescription(
          this.state.team,
          this.state.sprint,
          this.state.currentCat,
          this.state.welldata
        )
        .then(value => this.fetchingLists());
    }
    if (!equal(this.state.sprint, prevState.sprint)) {
      this.fetchingLists();
    }
  }
  onselectTeam = team => {
    this.setState({ team: team });
  };
  onselectSprint = sprint => {
    this.setState({ sprint: sprint });
    pushState({ selectSprint: sprint }, `/${this.state.team}/${sprint}`);
  };
  selectSplash = (team, sprint) => {
    this.setState({ team: team, sprint: sprint });
    pushState(
      { selectedTeam: team, selectSprint: sprint },
      `/${team}/${sprint}`
    );
  };
  checkCategoryEmpty(category){
    if(Object.keys(this.state[category]).length !== 0){
      return (
        <Card.Body className={`card_body ${category}`}>
          <Category
            items={this.state[category]}
            color={`${category}`}
            upvoted={this.callIncrease.bind(this)}
          />
        </Card.Body>
      )
    }
    else {
      return (
      <h1>Click on the cateogry to add a card</h1>)
    }
  }
  currentContent() {
    if (this.state.sprint) {
      return (
        <div>
          <Header
            selectedTeam={this.onselectTeam}
            selectedSprint={this.onselectSprint}
            team={this.state.team}
            sprint={this.state.sprint}
          />
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
                {this.checkCategoryEmpty("well")}
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
                {this.checkCategoryEmpty("bad")}
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
                {this.checkCategoryEmpty("todo")}
              </Col>
            </Row>
          </Container>{" "}
        </div>
      );
    }

    return (
      <Splash teams={this.state.teams} selectedSprint={this.selectSplash} />
    );
  }
  render() {
    return <div>{this.currentContent()}</div>;
  }
}

export default TeamBoard;
