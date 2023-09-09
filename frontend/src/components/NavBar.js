import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = (props) => {
  const customNavbarStyle = {
    padding: '0',
    margin: '0',
    backgroundColor: 'red', // Set the background color to red
  };

  return (
    <Navbar bg="red" expand="md" style={customNavbarStyle}>
      <Navbar.Brand href="/home">Brand Name</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <NavDropdown title="Facility" id="basic-nav-dropdown">
            <NavDropdown.Item href="https://capitalac.com/facility-tour/">Facility Tour</NavDropdown.Item>
            <NavDropdown.Item href="https://capitalac.com/weight-room/">Weight Room</NavDropdown.Item>
            <NavDropdown.Item href="https://capitalac.com/equipment/">Equipment</NavDropdown.Item>
            <NavDropdown.Item href="https://capitalac.com/executive-lockers/">Executive Lockers</NavDropdown.Item>
            <NavDropdown.Item href="https://capitalac.com/swimming-pool/">Swimming Pool</NavDropdown.Item>
            <NavDropdown.Item href="https://capitalac.com/sport-courts/">Sport Courts</NavDropdown.Item>
            <NavDropdown.Item href="https://capitalac.com/exercise-studios/">Exercise Studios</NavDropdown.Item>
            <NavDropdown.Item href="https://capitalac.com/sauna-steam-rooms/">Sauna Steam Rooms</NavDropdown.Item>
            <NavDropdown.Item href="https://capitalac.com/business-amenities/">Business Amenities</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={props.handleOpenModal}>Upload</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
