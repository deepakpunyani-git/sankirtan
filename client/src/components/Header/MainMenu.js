import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const MainMenu = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">SanKirtan</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Nav.Link as={Link} to="/service">Service</Nav.Link>
        <NavDropdown title="Artists" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/all-artists">All Artists</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/top-artists">Top Artists</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
      </Nav>
        <Nav className="d-none d-lg-inline-flex">
          <Nav.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google-plus-square"></i>
          </Nav.Link>
          <Nav.Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </Nav.Link>
          <Nav.Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-square"></i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainMenu;