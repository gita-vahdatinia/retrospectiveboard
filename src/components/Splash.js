import React from 'react';
import Header from './Header';
import TeamBoard from './TeamBoard'
import Popup from './Popup'
import * as api from "../api";
import {Form} from 'react-bootstrap'

class Splash extends React.Component {
  state ={
    teams: [],
    sprint: []
  }
  componentDidMount() {
    api.fetchTeams().then(teams => {
      this.setState({
        teams
      });
      api.fetchSprint(this.state.selected_team).then(sprints => {
        this.setState({
          sprints
        });
      });
    });
  }
  render() {
    return (
      <div className="backgroundImage" >
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select a Team</Form.Label>
            {this.state.teams.map(team =>
            <Form.Control as="select">
              <option>{team}</option>
            </Form.Control>
          )}
          </Form.Group>        </Form>
      </div>
    );
  }
}

export default Splash;
