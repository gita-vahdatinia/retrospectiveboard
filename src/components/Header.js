import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import * as api from '../api';
class Header extends React.Component {
  state = {
    teams: []
  }
  componentDidMount() {
    api.fetchTeams().then(teams => {
      this.setState({
        teams
      })
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
            <NavDropdown.Item href="#">
              {team}</NavDropdown.Item>)}
        </NavDropdown>
      </Navbar>
    </div>
  );
  }
};


export default Header;
