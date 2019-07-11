import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const Header = ({ teams, message }) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          {message}
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};


export default Header;
