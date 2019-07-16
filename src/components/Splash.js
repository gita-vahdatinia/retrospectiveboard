import React from "react";
import Header from "./Header";
import TeamBoard from "./TeamBoard";
import Popup from "./Popup";
import * as api from "../api";
import { Form, Row, Col, Button, Collapse, Dropdown } from "react-bootstrap";

class Splash extends React.Component {
  state = {
    teams: this.props.teams,
    sprints: ["0"],
    selectedTeam: "",
    selectedSprint: "",
    open: false
  };

  changeTeam(team) {
    api.fetchSprint(team.team).then(sprints => {
      this.setState({
        sprints: sprints,
        selectedTeam: team.team,
        selectedSprint: sprints[0]
      });
    });
  }
  changeSprint(sprint) {
    this.setState({
      selectedSprint: sprint.sprint
    });
  }
  handleSubmit(event) {
    api
      .createTeam(this.state.selectedTeam, this.state.selectedSprint)
      .then(resp => console.log(resp));
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
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select a Team
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.teams.map(team => (
                    <Dropdown.Item
                      onClick={this.changeTeam.bind(this, { team }) }
                    >
                      {team}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.state.selectedSprint}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.sprints.map(sprint => (
                    <Dropdown.Item onClick={this.changeSprint.bind(this, { sprint }) }>{sprint}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Button
              >
                Go To {this.state.selectedTeam} Board for Sprint{" "}
                {this.state.selectedSprint}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
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
