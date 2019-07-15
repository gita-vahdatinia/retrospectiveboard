import React from "react";
import Header from "./Header";
import TeamBoard from "./TeamBoard";
import Popup from "./Popup";
import * as api from "../api";
import { Form, Row, Col, Button, Collapse } from "react-bootstrap";

class Splash extends React.Component {
  state = {
    teams: [],
    sprints: ["0"],
    selectedTeam: "",
    selectedSprint: "",
    open: false
  };
  componentDidMount() {
    api.fetchTeams().then(teams => {
      this.setState({
        teams
      });
      api.fetchSprint(this.state.selectedTeam).then(sprints => {
        this.setState({
          sprints
        });
      });
    });
  }
  changeTeam(team) {
    api.fetchSprint(team.team).then(sprints => {
      this.setState({
        sprints: sprints,
        selectedTeam: team.team,
        selectedSprint: sprints[0]
      });
      this.props.selectedSprint(sprints[0]);
    });
    this.props.selectedTeam(team.team);
  }
  changeSprint(sprint) {
    this.setState({
      selectedSprint: sprint.sprint
    });
    this.props.selectedSprint(sprint.sprint);
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("SUbmited");
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div className="Splash">
        <div className="backgroundImage">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Select a Team</Form.Label>
                  {this.state.teams.map(team => (
                    <Form.Control
                      as="select"
                      onClick={this.changeTeam.bind(this, { team })}
                    >
                      <option>{team}</option>
                    </Form.Control>
                  ))}
                </Form.Group>
              </Form>
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Select a Sprint</Form.Label>
                  {this.state.sprints.map(sprint => (
                    <Form.Control as="select">
                      <option>{sprint}</option>
                    </Form.Control>
                  ))}
                </Form.Group>
              </Form>
              <Button
                onClick={() => this.setState({ open: !this.state.open })}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.open}
              >
                Create a New Board
              </Button>
              <Collapse in={this.state.open}>
                <div id="example-collapse-text">
                  <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Control
                      type="text"
                      name="selectedTeam"
                      placeholder="Enter Team Name"
                      onChange={this.handleChange.bind(this)}
                    />

                    <Form.Control
                      type="number"
                      name="selectedSprint"
                      placeholder="Enter Sprint Number"
                      onChange={this.handleChange.bind(this)}
                    />
                    <Form.Control
                      type="submit"
                      sprintvalue="selectedSprint"
                      value="Submit"
                    />
                  </Form>
                </div>
              </Collapse>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Splash;
