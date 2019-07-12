import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import * as api from '../api';
class Header extends React.Component {
  state = {
    teams: [],
    sprints: [],
    selected_team: "Tools",
    sprint_no: "0"
  }
  componentDidMount() {
    api.fetchTeams().then(teams => {
      this.setState({
        teams
      })
      api.fetchSprint(this.state.selected_team).then(sprints =>{
        this.setState({
          sprints
        })
      })
    })
  }
  changeTeam(team) {
    this.setState({
      selected_team: team.team
    })
  }
  changeSprint(sprint){
    this.setState({
      sprint_no: sprint.sprint
    })
  }
  render() {
    return (
    <div>
      <Navbar>
        <Navbar.Brand href="#home" className="title">
          Retro
        </Navbar.Brand>
        <NavDropdown title="Teams" id="basic-nav-dropdown">
          {this.state.teams.map(team=>
            <NavDropdown.Item href="#" onClick={this.changeTeam.bind(this, {team})}>
              {team}</NavDropdown.Item>)}
        </NavDropdown>
        <NavDropdown title="Sprint Number" id="basic-nav-dropdown">
          {this.state.sprints.map(sprint=>
            <NavDropdown.Item href="#" onClick={this.changeSprint.bind(this, {sprint})}>
              {sprint}</NavDropdown.Item>)}
        </NavDropdown>
      </Navbar>
    </div>
  );
  }
};


export default Header;
